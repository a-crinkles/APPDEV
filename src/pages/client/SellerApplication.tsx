import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";
import ClientLayout from "@/components/ClientLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const categoryLevels = [
  "Paintings",
  "Sculptures",
  "Photography",
  "Digital Art",
  "Prints",
  "Mixed Media",
  "Ceramics",
  "Textiles",
];

export default function SellerApplication() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: user?.email || "",
    phone: "",
    category: "",
    background: "",
    agreesToTerms: false,
  });

  const [firstNameValid, setFirstNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [backgroundValid, setBackgroundValid] = useState(true);
  const [categoryValid, setCategoryValid] = useState(true);

  const validateName = (name) => {
    return /^[A-Za-z\s]+$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/.test(email);
  };

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName") {
      setFirstNameValid(validateName(value));
    }
    if (name === "lastName") {
      setLastNameValid(validateName(value));
    }

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 11) return;
    }

    if (name === "background") {
      if (countWords(value) > 200) {
        setBackgroundValid(false);
        toast.error("Background must not exceed 200 words.");
      } else {
        setBackgroundValid(true);
      }
    }

    if (name === "email") {
      setEmailValid(validateEmail(value));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNameBlur = (name: "firstName" | "lastName") => {
    if (!validateName(formData[name])) {
      if (name === "firstName") {
        setFirstNameValid(false);
        toast.error("First name must contain only letters.");
      } else {
        setLastNameValid(false);
        toast.error("Last name must contain only letters.");
      }
    } else {
      if (name === "firstName") setFirstNameValid(true);
      if (name === "lastName") setLastNameValid(true);
    }
  };

  const handlePhoneBlur = () => {
    if (!/^09\d{9}$/.test(formData.phone)) {
      setPhoneValid(false);
      toast.error("Phone number must be exactly 11 digits and start with 09");
    } else {
      setPhoneValid(true);
    }
  };

  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
    setCategoryValid(true);
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (!emailValid) {
      toast.error("Please enter a valid email before agreeing to the terms.");
      return;
    }
    setFormData((prev) => ({ ...prev, agreesToTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      setCategoryValid(false);
      toast.error("Please select a main product category.");
      return;
    }

    if (!emailValid) {
      toast.error("Please enter a valid email.");
      return;
    }

    if (!formData.agreesToTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Application submitted successfully");
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to submit application");
    }
  };

  return (
    <ClientLayout>
      <div className="container max-w-4xl py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Become a Seller</h1>
          <p className="text-muted-foreground">
            Complete this form to apply as a seller on our platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Provide your contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} onBlur={() => handleNameBlur("firstName")} required />
                  {!firstNameValid && <p className="text-red-500 text-sm">First name must contain only letters.</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} onBlur={() => handleNameBlur("lastName")} required />
                  {!lastNameValid && <p className="text-red-500 text-sm">Last name must contain only letters.</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" value={formData.username} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                  {!emailValid && <p className="text-red-500 text-sm">Please input registered email.</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handlePhoneBlur}
                    required
                    className={!phoneValid ? "border-red-500" : ""}
                  />
                  {!phoneValid && <p className="text-red-500 text-sm">Invalid phone number.</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
              <CardDescription>Share your art experience and background.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Main Product Category</Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select main selling product" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {!categoryValid && <p className="text-red-500 text-sm">Please select a product category.</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="background">What interests you in becoming a seller?</Label>
                  <Textarea
                    id="background"
                    name="background"
                    value={formData.background}
                    onChange={handleInputChange}
                    placeholder="Tell us about your art background, achievements, and experience..."
                    className="min-h-[100px]"
                    required
                  />
                  {!backgroundValid && (
                    <p className="text-red-500 text-sm">Background must not exceed 200 words.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreesToTerms}
                  onCheckedChange={handleCheckboxChange}
                  disabled={!emailValid || !firstNameValid || !lastNameValid}
                />
                <Label htmlFor="terms">I agree to the terms and conditions</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
          <Button 
          type="submit" 
          className="bg-[#AA8F66] hover:bg-[#9A805D] text-white"
          size="lg" 
          disabled={
            !formData.firstName || 
            !formData.lastName || 
            !formData.username || 
            !formData.email || 
            !formData.phone || 
            !formData.category || 
            !formData.background || 
            !formData.agreesToTerms ||
            !firstNameValid || 
            !lastNameValid || 
            !emailValid || 
            !phoneValid || 
            !backgroundValid || 
            !categoryValid
            }>
              Submit Application </Button>
          </div>
        </form>
      </div>
    </ClientLayout>
  );
}