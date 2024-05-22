"use client";

import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {GiPadlock} from "react-icons/gi";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import {useForm} from "react-hook-form";
import {loginSchema, LoginSchema} from "@/lib/schemas/loginSchema";
import {zodResolver} from "@hookform/resolvers/zod";

export function LoginForm() {
  const {register, handleSubmit, formState: {errors, isValid}} = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched'
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  }
  return (
      <Card className="w-2/5 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-secondary">
            <div className="flex flex-row items-center gap-3">
              <GiPadlock size={30}/>
              <h1 className="text-3xl font-semibold">Login</h1>
            </div>
            <p className="text-neutral-500">Welcome back to NextMatch</p>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                  defaultValue=''
                  label="Email"
                  placeholder="Email"
                  variant="bordered"
                  {...register('email')}
                  isInvalid={!!errors.email} // turns object into boolean
                  errorMessage={errors.email?.message as string}
              />
              <Input
                  defaultValue=''
                  label="Password"
                  placeholder="Password"
                  type="password"
                  variant="bordered"
                  {...register('password')}
                  isInvalid={!!errors.password} // turns object into boolean
                  errorMessage={errors.password?.message as string}
              />
              <Button isDisabled={!isValid} fullWidth color="secondary" type="submit">Submit</Button>
            </div>
          </form>
        </CardBody>
      </Card>
  );
}