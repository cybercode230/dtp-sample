import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ShoppingCart } from "lucide-react";
import Button from "../../components/buttons/buttons";
import LogoModule from "../../sections/NavBar/modules/LogoModule";

interface OutletContext {
  originPage: string;
}

// Validation schema
const SigninSchema = z.object({
  method: z.enum(["email", "phone"]),
  email: z.string().email("Invalid email address").optional(),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, "Phone number must contain 10–11 digits")
    .optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/\d/, "Must include at least one number")
    .regex(/[@$!%*?&]/, "Must include one special character"),
});

type SigninForm = z.infer<typeof SigninSchema>;

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const { originPage } = useOutletContext<OutletContext>();
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("phone");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SigninForm>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      method: "phone",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninForm) => {
    console.log("Form Data:", data);
    alert("Login successful!");
    navigate(originPage || "/", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center from-gray-50 to-gray-100 p-6">
      {/* Logo */}
      <div className="mb-10 w-full flex justify-end md:justify-center">
        <LogoModule
          data={{
            src: "/assets/logo.svg",
            title: "KGExpress",
            subtitle: "Powered by Kigalishopexpress",
          }}
          align="center"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl px-8 bg-none backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign in with KGExpress Account
        </h2>
        <p className="text-gray-500 text-sm text-center mb-8">
          Please enter your details to continue
        </p>

        {/* Switch Tab */}
        <div className="flex mb-8 bg-gray-100 rounded-full overflow-hidden p-1">
          <button
            type="button"
            onClick={() => {
              setAuthMethod("phone");
              setValue("method", "phone");
            }}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              authMethod === "phone"
                ? "bg-white text-[#2e2e2e] shadow-sm rounded-full"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Use phone number
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod("email");
              setValue("method", "email");
            }}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors rounded-full ${
              authMethod === "email"
                ? "bg-white text-[#2e2e2e] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Use email
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Phone / Email */}
          {authMethod === "phone" ? (
            <div>
              <div className="flex items-center border-b border-gray-300 focus-within:border-green-600">
                <span className="text-gray-600 pr-2">+</span>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  {...register("phone")}
                  className="flex-1 bg-transparent p-3 focus:outline-none placeholder-gray-400"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>
          ) : (
            <div>
              <input
                type="email"
                placeholder="Enter your email address"
                {...register("email")}
                className="w-full p-3 border-b border-gray-300 bg-transparent focus:border-green-600 focus:outline-none placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
          )}

          {/* Password */}
          <div>
            <div className="relative border-b border-gray-300 focus-within:border-green-600">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className="w-full p-3 bg-transparent focus:outline-none placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-0 top-3 text-gray-500 hover:text-green-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/auth/forgot-password")}
              className="text-sm text-[#2e2e2e] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <Button
            label={isSubmitting ? "Signing in..." : "Sign In"}
            icon={ShoppingCart}
            iconPosition="left"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white hover:text-white py-3 rounded-xl font-semibold transition"
          />

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-4">
            By logging in, you accept our{" "}
            <a href="#" className="text-[#2e2e2e] underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#2e2e2e] underline">
              Privacy Policy
            </a>
            .
          </p>

          {/* OAuth */}
          <div className="flex flex-col items-center mt-6 space-y-3">
            <p className="text-gray-500 text-sm">Or sign in with</p>
            <div className="flex space-x-5">
              <button className="border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
                <img src="/assets/icons/google.svg" alt="Google" className="w-5 h-5" />
              </button>
              <button className="border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
                <img src="/assets/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
              </button>
              <button className="border border-gray-300 rounded-lg p-2 flex items-center space-x-2 hover:bg-gray-100">
                <ShoppingCart className="w-4 h-4 text-[#2e2e2e]" />
                <span className="text-sm text-gray-600">KigaliShopExpress</span>
              </button>
            </div>
          </div>

          {/* Signup */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/signup")}
              className="text-[#2e2e2e] font-semibold hover:underline"
            >
              Create one
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
