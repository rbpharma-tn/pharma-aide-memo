
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface AIProviderSelectorProps {
  form: UseFormReturn<any>;
  disabled?: boolean;
}

export function AIProviderSelector({ form, disabled }: AIProviderSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="aiProvider"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-gray-700">
            Générateur IA
          </FormLabel>
          <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
            <FormControl>
              <SelectTrigger className="text-base font-inter">
                <SelectValue placeholder="Choisir un générateur IA" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="perplexity">
                🔍 Perplexity (Recherche actualisée)
              </SelectItem>
              <SelectItem value="gemini">
                🧠 Gemini (Google)
              </SelectItem>
              <SelectItem value="together">
                🚀 Together.ai (Llama-3)
              </SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
