// src/pages/auth/Signin.tsx
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Facebook, Globe, HelpCircle, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../../components/buttons/buttons";
import LogoModule from "../../sections/NavBar/modules/LogoModule";

interface OutletContext {
  originPage: string;
}

const SigninSchema = z.object({
  method: z.enum(["email", "phone"]),
  email: z.string().email("Invalid email address").optional(),
  phone: z
    .string()
    .regex(/^\d{10,11}$/, "Phone number must contain 10–11 digits")
    .optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Include at least one lowercase letter")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/\d/, "Include at least one number")
    .regex(/[@$!%*?&]/, "Include one special character"),
});

type SigninForm = z.infer<typeof SigninSchema>;

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const { originPage } = useOutletContext<OutletContext>();
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("phone");

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } =
    useForm<SigninForm>({
      resolver: zodResolver(SigninSchema),
      defaultValues: { method: "phone", email: "", phone: "", password: "" },
    });

  const onSubmit = async (data: SigninForm) => {
    console.log("Form Data:", data);
    alert("Welcome to ICT Chamber Help Center!");
    navigate(originPage || "/", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-centerp-6">
      {/* Logo */}
      <div className="mb-10 w-full flex justify-center md:justify-center">
        <LogoModule
          data={{
            src: "/public/assets/ict_chamber_1.jpeg",
            title: "ICT Chamber Help Center",
            subtitle: "Digital Transformation Platform Support",
          }}
          align="center"
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-md rounded-2xl backdrop-blur-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign in to Help Center
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Access resources, guides, and support for the DTP platform
        </p>

        {/* Switch Tab */}
        <div className="flex mb-6 bg-gray-100 rounded-full overflow-hidden p-1">
          {["phone", "email"].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => {
                setAuthMethod(method as "phone" | "email");
                setValue("method", method as "phone" | "email");
              }}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                authMethod === method
                  ? "bg-white text-[#2e2e2e] shadow-sm rounded-full"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {method === "phone" ? "Phone" : "Email"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {authMethod === "phone" ? (
            <div>
              <div className="flex items-center focus-within:border-green-600 rounded-lg overflow-hidden">
                <span className="text-gray-600 pl-3">+</span>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  {...register("phone")}
                  className="flex-1 bg-transparent p-3 focus:outline-none placeholder-gray-400"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          ) : (
            <div>
              <input
                type="email"
                placeholder="Enter email address"
                {...register("email")}
                className="w-full p-3 border-b border-gray-300 bg-transparent focus:outline-none focus:border-green-600 rounded-lg"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
          )}

          <div>
            <div className="relative border-b border-gray-300 focus-within:border-green-600 rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
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
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/auth/forgot-password")}
              className="text-sm text-[#2e2e2e] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <Button
            label={isSubmitting ? "Signing in..." : "Sign In"}
            icon={HelpCircle}
            iconPosition="left"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl font-semibold text-white hover:text-white"
          />

          {/* OAuth */}
          <div className="flex flex-col items-center mt-5 space-y-3">
            <p className="text-gray-500 text-sm">Or sign in with</p>
<div className="flex flex-wrap justify-center gap-4">
  {/* Google */}
  <motion.button
    whileHover={{ scale: 1.1 }}
    className="border border-gray-300 rounded-full p-3 hover:bg-gray-100 flex items-center justify-center transition"
    title="Sign in with Google"
  >
    <Globe size={20} className="text-[#2e2e2e]" />
  </motion.button>

  {/* Facebook */}
  <motion.button
    whileHover={{ scale: 1.1 }}
    className="border border-gray-300 rounded-full p-3 hover:bg-gray-100 flex items-center justify-center transition"
    title="Sign in with Facebook"
  >
    <Facebook size={20} className="text-[#2e2e2e]" />
  </motion.button>

  {/* Github */}
  <motion.button
    whileHover={{ scale: 1.1 }}
    className="border border-gray-300 rounded-full p-3 hover:bg-gray-100 flex items-center justify-center transition"
    title="Sign in with Github"
  >
    <Github size={20} className="text-[#2e2e2e]" />
  </motion.button>

  {/* LinkedIn */}
  <motion.button
    whileHover={{ scale: 1.1 }}
    className="border border-gray-300 rounded-full p-3 hover:bg-gray-100 flex items-center justify-center transition"
    title="Sign in with LinkedIn"
  >
    <Linkedin size={20} className="text-[#2e2e2e]" />
  </motion.button>

</div>

          </div>

          {/* Signup */}
          <p className="text-sm text-gray-600 text-center mt-5">
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
