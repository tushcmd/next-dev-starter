"use client";
import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Skeleton } from "../ui/skeleton";

const selectOptions = [
  {
    value: "dark",
    label: "Dark",
  },
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
];

const validationSchema = z.object({
  testInput: z.string().min(1, "Name is required"),
  terms: z.boolean().refine((value) => value === true, "Terms and conditions must be accepted"),
  airplane: z.boolean().refine((value) => value === true, "Airplane mode must be enabled"),
  select: z.string().refine((value) => selectOptions.some((option) => option.value === value), "Please select a theme"),
  date: z.date().refine((value) => value instanceof Date, "Invalid date"),
});

const OverviewComponents: FC = () => {
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      testInput: "",
      terms: false,
      airplane: false,
      select: "",
      date: null,
    },
  });

  const onSubmit = (data) => console.log(data);

  return (
    <section className="flex flex-col gap-10">
      <div>
        <h2 className="h2">Beatiful UI Components</h2>
        <p className="h4 text-muted-foreground">Built with Shadcn-UI and Tailwind</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-1 gap-5">
        {/* buttons  */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-5">
            <Button variant="default">Default</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button loading>Loading</Button>
          </CardContent>
        </Card>
        {/* form*/}
        <Card>
          <CardHeader>
            <CardTitle>Form</CardTitle>
            <CardDescription>Built on React Hook Form and Zod</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                <Controller
                  name="testInput"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      placeholder="Bílek"
                      label="Name"
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="date"
                  control={control}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      label="Date of birth"
                      {...field}
                      error={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name="select"
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectInput
                      options={selectOptions}
                      placeholder="Choose prefered theme"
                      label="Theme"
                      {...field}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>
              <Controller
                name="airplane"
                control={control}
                render={({ field, fieldState }) => (
                  <Switch
                    {...field}
                    label="Airplane mode"
                    error={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="terms"
                control={control}
                render={({ field, fieldState }) => (
                  <Checkbox
                    {...field}
                    label="Accept terms and conditions"
                    description="You agree to our Terms of Service and Privacy Policy."
                    error={fieldState.error?.message}
                  />
                )}
              />

              <Button type="submit" className="w-full" loading={isSubmitting}>
                Validate
              </Button>
            </form>
          </CardContent>
        </Card>
        {/* skeletons */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <Skeleton className="h-20 aspect-square rounded-full " />
              <div className="flex flex-col w-full gap-2">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            </div>

            <Skeleton className="w-full h-40" />
          </CardContent>
        </Card>
        {/* overlays */}
        <Card>
          <CardHeader>
            <CardTitle>Overlays</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Dialog>
              <DialogTrigger className={buttonVariants({ variant: "outline" })}>
                Open dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>

                <Button className="w-full">Delete account</Button>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger className={buttonVariants({ variant: "outline" })}>
                Open sheet
              </SheetTrigger>
              <SheetContent className="max-w-[400px]">
                <SheetHeader>
                  <SheetTitle>Are you sure absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete your account and
                    remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <Popover>
              <PopoverTrigger>
                <div className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}>
                  <InfoIcon className="w-5 h-5  mr-2" />
                  <span>More information</span>
                </div>
              </PopoverTrigger>
              <PopoverContent>Place content for the popover here.</PopoverContent>
            </Popover>
            <Button
              variant="destructive"
              onClick={() =>
                toast({
                  title: 'Ups. Something went wrong',
                  description: 'Try it again later please',
                  variant: 'destructive',
                })
              }
            >
              Toast destructive
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                toast({
                  title: 'Scheduled: Catch up',
                  description: 'Friday, February 10, 2023 at 5:57 PM',
                });
              }}
            >
              Toast default
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OverviewComponents;
