"use client";

import React, { useEffect, useRef, useState } from "react";
import cn from "@/utils/cn";
import CrossIcon from "public/icons/cross-small.svg";
import NotifIcon from "public/icons/cowbell.svg";
import Image, { StaticImageData } from "next/image";
import TextSm from "@/components/Typography/TextSm";
import Button from "@/components/Button";
import MessageIcon from "public/icons/message.svg";

type UserNotif = { profile: StaticImageData; name: string; id: string };

const notifications: UserNotif[] = [];

const NotifModal = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={cn(className)}>
        <NotifIcon className="m-4 cursor-pointer" />
        <div className="bg-primary-400 py-0.5 px-2.5 hidden md:block">
          {notifications.length}
        </div>
      </button>

      {isOpen && (
        <div className="bg-black-3 absolute top-25 right-0 lg:right-20 w-[556px] z-50 p-6">
          <div className="flex items-center justify-between pb-6 border-b border-black-border">
            <p className="text-2xl leading-9 font-bold text-white">
              Notification
            </p>
            <CrossIcon
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {notifications.length <= 0 ? (
            <>
              <div className="flex items-center justify-center">
                {/* <Image src={NotifImage || null} alt="" quality={100} /> */}
              </div>
              <div className={cn("text-sm leading-6 text-white", "px-4 py-3")}>
                No Notifications
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-4">
                {notifications.map((item, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex justify-between items-center",
                      "p-3 border-b border-black-2"
                    )}
                  >
                    <div className="flex gap-4 items-center">
                      <span className="relative">
                        <Image src={item.profile} alt="" quality={100} />
                        <MessageIcon className="absolute right-0 top-[53%]" />
                      </span>

                      <div>
                        <div className="flex gap-2 items-center">
                          <p className="text-base text-grey-600 leading-6">
                            {item.name}
                          </p>
                          <p className="text-base text-white leading-7 font-semibold">
                            {item.id}
                          </p>
                        </div>
                        <TextSm className="text-grey-600 mt-1">
                          Send you a message
                        </TextSm>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <TextSm className="text-white font-semibold">2h</TextSm>
                      <div className="h-3 w-3 bg-primary-400"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-6 border-t border-black-border">
                <Button className="py-4 w-full font-semibold">
                  See All Notifications
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default NotifModal;
