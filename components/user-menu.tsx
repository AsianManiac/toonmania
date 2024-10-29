import { Fragment, useCallback } from "react";
import { User } from "@prisma/client";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import useCreateToonModal from "@/hooks/usecreateToonModal";
import { SafeUser } from "@/types";

export interface UserMenuProps {
  currentUser: SafeUser;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const createToon = useCreateToonModal();

  const onCreateToon = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    createToon.onOpen();
  }, [currentUser, loginModal, createToon]);
  console.log(currentUser?.id);
  return (
    <>
      {currentUser ? (
        <Fragment>
          <Button
            onClick={onCreateToon}
            variant={"default"}
            className={cn(
              "mx-1 px-10 h-7 w-10 bg-black/80 text-xs font-semibold hover:bg-black dark:bg-green-400 hover:dark:bg-green-500 text-white rounded-3xl"
            )}
          >
            Publish
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-transparent border-0 h-8 w-8"
                variant="ghost"
                size="icon"
              >
                <User2Icon
                  size={18}
                  className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {}}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>My Toons</DropdownMenuItem>
              <DropdownMenuItem onClick={onCreateToon}>
                Create Toon
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Fragment>
      ) : (
        <Button
          onClick={loginModal.onOpen}
          variant={"outline"}
          className={cn(
            "mx-1 px-10 h-7 w-10 text-xs font-semibold text-[#838383] rounded-3xl"
          )}
        >
          Login
        </Button>
      )}
    </>
  );
};

export default UserMenu;
