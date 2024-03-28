"use client";
import { IUser } from "@/models/User";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";

import { IconCheck, IconEdit, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

export default function UsersList({ users }: { users: IUser[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-3xl">Users</h1>
      <div className="p-3 rounded-lg flex justify-between">
        <p className="font-bold w-[25%]">Email</p>
        <p className="font-bold w-[25%]">Email verified</p>
        <p className="font-bold w-[25%]">Role</p>
      </div>
      {users?.map((user) => {
        return (
          <div
            className="bg-primary shadow-md p-3 rounded-lg flex  justify-between"
            key={user.email}
          >
            <p className="w-[25%]">{user.email}</p>
            <p className="w-[25%]">
              {user.emailVerified ? (
                <IconCheck className="drop-shadow-md" />
              ) : (
                <IconX className="drop-shadow-md" />
              )}
            </p>
            <div className="w-[25%] drop-shadow-md flex gap-2">
              <p>{user.role}</p>
              <button className="hover:text-accent">
                <IconEdit />
              </button>
            </div>
          </div>
        );
      })}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Your name
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setLoading(true);
                  }}
                  form="name_edit_form"
                  type="submit"
                  color="primary"
                >
                  {loading ? <Spinner color="white" size="sm" /> : "Save"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
