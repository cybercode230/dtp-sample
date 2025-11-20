import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, User, Store } from "lucide-react";
import Button from "../../components/buttons/buttons";
import LogoModule from "../../sections/NavBar/modules/LogoModule";

interface OutletContext {
  originPage: string;
}

// Validation schema
const SignupSchema = z
  .object({
    accountType: z.enum(["individual", "business"]),
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().regex(/^\d{10,11}$/, "Phone must contain 10–11 digits"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/\d/, "Must include at least one number")
      .regex(/[@$!%*?&]/, "Must include one special character"),
    confirmPassword: z.string(),
    businessName: z.string().min(2, "Business name is required").optional(),
    businessTIN: z.string().optional(),
    businessAddress: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof SignupSchema>;

const Signup: React.FC = () => {
  const { originPage } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      accountType: "individual",
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      businessTIN: "",
      businessAddress: "",
    },
  });

  const accountType = watch("accountType");

  const onSubmit = async (data: SignupForm) => {
    console.log("Signup Data:", data);
    alert("Welcome to ICT Chamber Help Center!");
    navigate(originPage || "/", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center from-gray-50 to-gray-100 p-6">
      {/* Logo */}
      <div className="mb-10 w-full flex justify-end md:justify-center">
        <LogoModule
          data={{
            src: "/public/assets/ict_chamber_1.jpeg",
            title: "ICT Chamber Help Center",
            subtitle: "Digital Transformation Support",
          }}
          align="center"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl px-8 bg-none backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create your ICT Chamber Account
        </h2>
        <p className="text-gray-500 text-sm text-center mb-8">
          Access support, resources, and digital transformation services
        </p>

        {/* Account Type Switch */}
        <div className="flex mb-8 bg-gray-100 rounded-full overflow-hidden p-1">
          <button
            type="button"
            onClick={() => setValue("accountType", "individual")}
            className={`flex-1 flex items-center justify-center space-x-1 py-2.5 text-sm font-medium transition-colors ${
              accountType === "individual"
                ? "bg-white text-[#2e2e2e] shadow-sm rounded-full"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <User size={16} /> <span>Individual</span>
          </button>
          <button
            type="button"
            onClick={() => setValue("accountType", "business")}
            className={`flex-1 flex items-center justify-center space-x-1 py-2.5 text-sm font-medium transition-colors rounded-full ${
              accountType === "business"
                ? "bg-white text-[#2e2e2e] shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Store size={16} /> <span>Business</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <input
              type="text"
              placeholder="Full name"
              {...register("fullName")}
              className="w-full p-3 border-b border-gray-300 bg-transparent focus:border-green-600 focus:outline-none placeholder-gray-400"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email address"
              {...register("email")}
              className="w-full p-3 border-b border-gray-300 bg-transparent focus:border-green-600 focus:outline-none placeholder-gray-400"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="text"
              placeholder="Phone number"
              {...register("phone")}
              className="w-full p-3 border-b border-gray-300 bg-transparent focus:border-green-600 focus:outline-none placeholder-gray-400"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Business fields */}
          {accountType === "business" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Business Name"
                {...register("businessName")}
                className="w-full p-3 border-b border-gray-300 bg-transparent focus:border-green-600 focus:outline-none placeholder-gray-400"
              />
              {errors.businessName && (
                <p className="text-red-500 text-xs mt-1">{errors.businessName.message}</p>
              )}
              <input
                type="text"
                placeholder="Business TIN (optional)"
                {...register("businessTIN")}
                className="w-full p-3 border-b border-gray-300 bg-transparent focus:border-green-600 focus:outline-none placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Business Address (optional)"
                {...register("businessAddress")}
                className="w-full p-3 border-b border-gray-300 bg-transparent focus:border-green-600 focus:outline-none placeholder-gray-400"
              />
            </div>
          )}

          {/* Password */}
          <div className="relative border-b border-gray-300 focus-within:border-green-600">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
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

          {/* Confirm Password */}
          <div className="relative border-b border-gray-300 focus-within:border-green-600">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              {...register("confirmPassword")}
              className="w-full p-3 bg-transparent focus:outline-none placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-0 top-3 text-gray-500 hover:text-green-700"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}

          {/* Submit */}
          <Button
            label={isSubmitting ? "Creating account..." : "Create Account"}
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white py-3 rounded-xl font-semibold transition"
          />

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-4">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-[#2e2e2e] underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#2e2e2e] underline">
              Privacy Policy
            </a>
            .
          </p>

          {/* Already have an account */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/auth/signin")}
              className="text-[#2e2e2e] font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
