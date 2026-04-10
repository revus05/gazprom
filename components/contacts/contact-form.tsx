"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { sendContactEmail } from "@/app/actions/send-email";
import {
  type ContactFormData,
  contactFormSchema,
  contractorTypeLabels,
  requestTypeLabels,
} from "@/lib/schemas/contact-form";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contractorType: undefined,
      organizationName: "",
      unp: "",
      contactName: "",
      contactPosition: "",
      email: "",
      requestType: undefined,
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    setLoading(true);
    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        toast.success("Обращение отправлено!", {
          description:
            "Наш специалист свяжется с вами в течение одного рабочего дня.",
        });
        form.reset();
      } else {
        toast.error("Ошибка отправки", {
          description:
            result.error ??
            "Попробуйте позже или свяжитесь с нами по телефону.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Contractor type */}
        <FormField
          control={form.control}
          name="contractorType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип контрагента *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="md:w-100">
                    <SelectValue placeholder="Выберите тип контрагента" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent position="popper">
                  {Object.entries(contractorTypeLabels).map(
                    ([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Organization */}
        <FormField
          control={form.control}
          name="organizationName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Полное наименование организации *</FormLabel>
              <FormControl>
                <Input placeholder="ООО «Название организации»" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* UNP */}
        <FormField
          control={form.control}
          name="unp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>УНП *</FormLabel>
              <FormControl>
                <Input placeholder="000000000" maxLength={9} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact person — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contactName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Контактное лицо (ФИО) *</FormLabel>
                <FormControl>
                  <Input placeholder="Иванов Иван Иванович" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactPosition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Должность *</FormLabel>
                <FormControl>
                  <Input placeholder="Директор" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="contact@company.by"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Request type */}
        <FormField
          control={form.control}
          name="requestType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Характер обращения *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="md:w-100">
                    <SelectValue placeholder="Выберите характер обращения" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent position="popper">
                  {Object.entries(requestTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Краткое описание обращения *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Опишите суть вашего обращения, укажите объём потребления газа, желаемые сроки начала сотрудничества и другую важную информацию..."
                  className="min-h-32 resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading ? (
              "Отправка..."
            ) : (
              <>
                Отправить обращение
                <Send className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            * — обязательные поля. Нажимая «Отправить обращение», вы
            соглашаетесь с{" "}
            <span className="underline cursor-pointer">
              политикой конфиденциальности
            </span>
            .
          </p>
        </div>
      </form>
    </Form>
  );
}
