export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export const handleContactSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  setIsSubmitting: (value: boolean) => void
) => {
  e.preventDefault();
  setIsSubmitting(true);

  const formData = new FormData(e.currentTarget);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    project: formData.get("project"),
    message: formData.get("message"),
  };

  // Simulate API call
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 2 giờ.");
    (e.target as HTMLFormElement).reset();
    console.log(data);
  } catch (error) {
    alert("Có lỗi xảy ra. Vui lòng thử lại. Lỗi: " + error);
  } finally {
    setIsSubmitting(false);
  }
};

export const openExternalLink = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
