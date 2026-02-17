"use client";
import { useState } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@heroui/button";
import { authService } from "@/services/admin/auth";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { InputOtp } from "@heroui/input-otp";
import { useAppMutation } from "@/hooks/use-app-mutation";
import { AxiosError } from "axios";

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const getErrorMessage = (error: unknown) => {
    if (!error) return undefined;
    if (error instanceof AxiosError) {
      // APIError might be in response.data
      const data = error.response?.data as { message?: string } | undefined;
      return data?.message || error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    // Check if error is an object with message property (like VerifyOtpResponse thrown as error)
    if (typeof error === 'object' && error !== null && 'message' in error) {
      return (error as { message: string }).message;
    }
    return undefined;
  };

  // Mutation for requesting OTP
  const requestOtpMutation = useAppMutation({
    mutationFn: authService.requestOtp,
    // errorMessage: "auth.send_otp_error",
    onSuccess: (data) => {
      if (data.success) {
        setStep("otp");
      }
    },
  });

  // Mutation for verifying OTP
  const verifyOtpMutation = useAppMutation({
    mutationFn: async (code: string) => {
      const data = await authService.verifyOtp(phone, code);
      if (!data.success) {
        throw data || "Invalid OTP";
      }
      // Sign in to Firebase with the custom token
      await signInWithCustomToken(auth, data.custom_token);
      return data;
    },
    errorMessage: "auth.verify_otp_error",
    onSuccess: (data) => {
      setUser(data.user);
      router.push("/");
    },
  });

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    requestOtpMutation.mutate(phone);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    verifyOtpMutation.mutate(otp);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-card p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            {step === "phone" ? "Вход в систему" : "Введите код"}
          </h2>
          <p className="mt-2 text-center text-sm text-secondary">
            {step === "phone"
              ? "Введите номер телефона для получения кода доступа"
              : `Код отправлен на номер ${phone}`}
          </p>
        </div>

        {step === "phone" ? (
          <form className="mt-8 space-y-6" onSubmit={handlePhoneSubmit}>
            <PhoneInput
              defaultCountry="KG"
              international
              countryCallingCodeEditable={false}
              label="Номер телефона"
              placeholder="Введите номер"
              value={phone}
              onChange={(val: string) => setPhone(val || "")}
              error={requestOtpMutation.isError}
              errorMessage={getErrorMessage(requestOtpMutation.error)}
            />

            <Button
              type="submit"
              fullWidth
              color="primary"
              size="lg"
              isLoading={requestOtpMutation.isPending}
            >
              Получить код
            </Button>
          </form>
        ) : (
          <form className="mt-8 space-y-6 w-fit mx-auto" onSubmit={handleOtpSubmit}>
            <InputOtp
              type="text"
              label="Код из SMS"
              placeholder="123456"
              value={otp}
              onValueChange={(val: string) => {
                setOtp(val);
                if (val.length === 6) {
                  verifyOtpMutation.mutate(val);
                }
              }}
              required
              length={6}
              size="lg"
              className="mx-auto w-full flex items-center"
              variant="bordered"
              errorMessage={getErrorMessage(verifyOtpMutation.error) || (verifyOtpMutation.isError ? "Неверный код" : undefined)}
              isInvalid={verifyOtpMutation.isError}
            />

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                fullWidth
                color="primary"
                size="lg"
                isLoading={verifyOtpMutation.isPending}
              >
                Подтвердить
              </Button>
              <Button
                variant="light"
                fullWidth
                onPress={() => {
                  setStep("phone");
                  requestOtpMutation.reset();
                  verifyOtpMutation.reset();
                }}
              >
                Вернуться назад
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
