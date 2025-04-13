"use client";

import Autocomplete from "@/components/Autocomplete";
import Card from "@/components/Card/Card";
import cn from "@/utils/cn";
import GeneratorIcon from "public/icons/generator.svg";
import { useState } from "react";
import PortIcon from "public/icons/port.svg";
import RotationIcon from "public/icons/rotation.svg";
import FormatIcon from "public/icons/format.svg";
import QuantityIcon from "public/icons/quantity.svg";
import InputText from "@/components/InputText";
import ChangePassModal from "@/modules/Modals/ChangePassModal";
import GenerateProxyModal from "@/modules/Modals/GenerateProxyModal";
import { toast } from "react-toastify";
import MagicwandIcon from "public/icons/magic-wand.svg";

import Button from "@/components/Button";

const portOptions = [{ label: "", value: "" }];
const formatOptions = [{ label: "", value: "" }];
const rotationOptions = [{ label: "", value: "" }];

const ProxyGenerator = ({ className }: { className?: string }) => {
  const [port, setPort] = useState(portOptions[0].value);
  const [format, setFormat] = useState(formatOptions[0].value);
  const [rotation, setRotation] = useState(rotationOptions[0].value);
  const [quantity, setQuantity] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);

  const handleGenerateProxyButtonClick = () => {
    if (!port || !format || !rotation || !quantity) {
      toast.error("Fill in the fields first");
      return;
    }

    setOpenModal(true);
  };

  return (
    <Card className={cn("px-0 pt-4.5", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GeneratorIcon />
          <p className="text-white text-lg font-bold">Proxy Generator</p>
        </div>
        <div className="pr-6">
          <ChangePassModal />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-7 px-6">
        <Autocomplete
          className="max-w-[472px] w-full"
          startAdornment={<PortIcon />}
          options={portOptions}
          placeholder="Select Port"
          label="Port"
          value={port}
          onChange={({ value }) => setPort(value)}
          variant="primary"
        />

        <Autocomplete
          className="max-w-[472px] w-full"
          startAdornment={<RotationIcon />}
          options={rotationOptions}
          placeholder="Select Rotation"
          label="Rotation"
          value={rotation}
          onChange={({ value }) => setRotation(value)}
          variant="primary"
        />

        <Autocomplete
          className="max-w-[472px] w-full"
          startAdornment={<FormatIcon />}
          options={formatOptions}
          placeholder="Select Format"
          label="Format"
          value={format}
          onChange={({ value }) => setFormat(value)}
          variant="primary"
        />

        <InputText
          className="max-w-[472px] w-full"
          type="number"
          label="Quantity"
          placeholder="Enter"
          startAdornment={<QuantityIcon />}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div className="flex items-center justify-end pr-6">
        <GenerateProxyModal open={openModal} setOpen={setOpenModal} />
      </div>

      <div className="flex items-center justify-end py-6 pr-6">
        <Button
          onClick={handleGenerateProxyButtonClick}
          Icon={MagicwandIcon}
          className="py-3 px-10 font-semibold"
        >
          Generate Proxy
        </Button>
      </div>
    </Card>
  );
};
export default ProxyGenerator;
