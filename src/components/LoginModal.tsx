import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "./ui/dialog";
import Image from "next/image";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { buttonVariants } from "./ui/button";

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" absolute z-[99999999]">
        <DialogHeader>
          <div className=" relative mx-auto w-24 h-24 mb-2 ">
            <Image src="/snake-1.png" fill alt="Snake illustration" />
          </div>
          <DialogTitle className="text-3xl tracking-tight font-bold text-center text-gray-900">
            Log in to continue
          </DialogTitle>
          <DialogDescription className="text-base text-center py-2 ">
            <span className=" font-medium text-zinc-900">
              Your configuration was saved!
            </span>{" "}
            Please login or create an account to continue your purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols2- gap-6 divide-x divide-gray-200">
          <LoginLink
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Login
          </LoginLink>
          <RegisterLink 
            className={buttonVariants({ 
              variant: "default",
            })}
          >
            Register
          </RegisterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
