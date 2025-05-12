"use client";

import Button from "@/components/Button";
import InputText from "@/components/InputText";
import H1 from "@/components/Typography/H1";
import TextBase from "@/components/Typography/TextBase";
import EmailIcon from "public/icons/letter-icon.svg";
import PassIcon from "public/icons/pass-icon.svg";
import UserIcon from "public/icons/user.svg";
import { useState } from "react";
import EnterIcon from "public/icons/enter.svg";
import cn from "@/utils/cn";
import Link from "next/link";
import BackIcon from "public/icons/arrow-small-left.svg";
import PasswordInput from "@/components/PasswordInput";
import { toast } from "react-toastify";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
        },
      },
    });

    if (error) {
      toast.error(`Signup error: ${error.message}`);
      return;
    }

    toast.success("Confirmation email sent. Please check your inbox!");
    router.replace("/activate/check-email");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-14.5 py-9.5">
      <div className={cn("grow", "flex items-center justify-center w-full")}>
        <div className="max-w-[488px] w-full">
          <H1>Sign up</H1>
          <TextBase className="text-grey-600 mt-3">
            Let’s sign up quickly to get started.
          </TextBase>

          <div className="mt-14">
            <InputText
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              labelBg="bg-black"
              startAdornment={<EmailIcon />}
              label="Email"
              placeholder="Enter your email"
            />
            <InputText
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              labelBg="bg-black"
              startAdornment={<UserIcon />}
              className="mt-8"
              label="Username"
              placeholder="Enter your username"
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              labelBg="bg-black"
              startAdornment={<PassIcon />}
              className="mt-8"
              label="Password"
              placeholder="Enter your password"
            />

            <div className="flex items-center mt-12 gap-2">
              {/* TODO: Customize checkbox to match design */}
              <input
                id="agree"
                type="checkbox"
                checked={checked}
                onChange={() => setChecked((checked) => !checked)}
              />
              <label
                htmlFor="agree"
                className="text-sm cursor-pointer leading-6"
              >
                I agree to the{" "}
                <span className="text-primary-400">terms & conditions</span>
              </label>
            </div>

            <Button
              disabled={!checked}
              onClick={handleSignup}
              Icon={EnterIcon}
              className="py-3 w-full mt-12"
            >
              Sign Up
            </Button>
          </div>

          <div
            className={cn("mt-24 border-t border-white/15 pt-8 text-center")}
          >
            <TextBase>
              Already have an account ?{" "}
              <Link href={"/sign-in"} className="text-primary-400 underline">
                Sign in
              </Link>
            </TextBase>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <Button variant="text" className="py-3.5" Icon={BackIcon}>
          Back
        </Button>

        <Button variant="text">Home page</Button>
      </div>
    </div>
  );
};

export default SignUpPage;
