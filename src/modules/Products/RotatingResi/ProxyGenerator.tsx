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
import ErrorIcon from "public/icons/document.svg";
import InterrogationIcon from "public/icons/interrogation.svg";
import Button from "@/components/Button";
import useFetch from "@/hooks/useFetch";
import { GenerateRotatingResi } from "@/services/customApi";
import Loader from "@/components/Loader";

const portOptions = [
  { label: "http|https", value: "http|https" },
  { label: "socks5", value: "socks5" },
];
const formatOptions = [
  {
    label: `{hostname}:{port}:{username}:{password}`,
    value: `{hostname}:{port}:{username}:{password}`,
  },
  {
    label: `{hostname}:{port}@{username}:{password}`,
    value: `{hostname}:{port}@{username}:{password}`,
  },
  {
    label: `{username}:{password}:{hostname}:{port}`,
    value: `{username}:{password}:{hostname}:{port}`,
  },
  {
    label: `{username}:{password}@{hostname}:{port}`,
    value: `{username}:{password}@{hostname}:{port}`,
  },
];

const rotationOptions = [
  { label: "Random", value: "random" },
  { label: "Sticky", value: "sticky" },
];

const ProxyGenerator = ({ className }: { className?: string }) => {
  const [port, setPort] = useState(portOptions[0].value);
  const [format, setFormat] = useState(formatOptions[0].value);
  const [rotation, setRotation] = useState(rotationOptions[0].value);
  const [quantity, setQuantity] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const [res, setRes] = useState<any>(null);

  const { fetch: generateFetch, loading } = useFetch(
    GenerateRotatingResi,
    false,
    { toastOnError: true }
  );

  const handleGenerateProxyButtonClick = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!port) {
      toast.error("Please select a port type", { icon: <InterrogationIcon /> });
      return;
    }

    if (!rotation) {
      toast.error("Please select a rotation type", {
        icon: <InterrogationIcon />,
      });
      return;
    }

    if (!format) {
      toast.error("Please select a format", { icon: <InterrogationIcon /> });
      return;
    }

    if (!quantity || quantity <= 0) {
      toast.error("Please enter a valid quantity", {
        icon: <InterrogationIcon />,
      });
      return;
    }

    try {
      const payload = {
        quantity,
        rotation,
        country: "",
        port,
        format,
      };

      const response = await generateFetch(payload);
      setRes(response);
      toast.success("Generated Successfully!");
      setOpenModal(true);
    } catch (error) {
      console.log("failed", error);
    }
  };

  return (
    <Card className={cn("px-0 pt-4.5", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GeneratorIcon />
          <p className="text-white text-base md:text-lg font-bold whitespace-nowrap">
            Proxy Generator
          </p>
        </div>
        <div className="pr-6">
          <ChangePassModal />
        </div>
      </div>

      <form onSubmit={handleGenerateProxyButtonClick}>
        <div className="mt-12 grid grid-cols-2 gap-7 px-6">
          <Autocomplete
            startAdornment={<PortIcon />}
            options={portOptions}
            placeholder="Select Port"
            label="Port"
            value={port}
            onChange={({ value }) => setPort(value)}
            variant="primary"
          />

          <Autocomplete
            startAdornment={<RotationIcon />}
            options={rotationOptions}
            placeholder="Select Rotation"
            label="Rotation"
            value={rotation}
            onChange={({ value }) => setRotation(value)}
            variant="primary"
          />

          <Autocomplete
            startAdornment={<FormatIcon />}
            options={formatOptions}
            placeholder="Select Format"
            label="Format"
            value={format}
            onChange={({ value }) => setFormat(value)}
            variant="primary"
          />

          <InputText
            type="number"
            label="Quantity"
            placeholder="Enter"
            startAdornment={<QuantityIcon />}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center justify-end py-6 pr-6">
          <Button
            type="submit"
            Icon={MagicwandIcon}
            className="py-3 px-10 font-semibold"
          >
            {loading ? (
              <>
                Generating Proxy <Loader />
              </>
            ) : (
              "Generate Proxy"
            )}
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-end pr-6">
        <GenerateProxyModal
          data={res?.data}
          open={openModal}
          setOpen={setOpenModal}
        />
      </div>
    </Card>
  );
};
export default ProxyGenerator;
