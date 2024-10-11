import { z } from "zod";

const workExperienceSchema = z.discriminatedUnion("hasWorkExperience", [
  z.object({
    hasWorkExperience: z.literal(true),
    companyName: z.string().min(1),
  }),
  z.object({
    hasWorkExperience: z.literal(false),
  }),
]);

const languageKnowledgeSchema = z.discriminatedUnion("knowsOtherLanguages", [
  z.object({
    knowsOtherLanguages: z.literal(true),
    languages: z.array(
      z.object({
        name: z.string().min(1),
      })
    ),
  }),
  z.object({
    knowsOtherLanguages: z.literal(false),
  }),
]);

const educationSchema = z.discriminatedUnion("educationLevel", [
  z.object({
    educationLevel: z.literal("noFormalEducation"),
  }),
  z.object({
    educationLevel: z.literal("highSchoolDiploma"),
    schoolName: z.string().min(1),
  }),
  z.object({
    educationLevel: z.literal("bachelorsDegree"),
    universityName: z.string().min(1),
  }),
]);

const formSchema = z
  .object({
    fullName: z.string().min(1),
  })
  .and(workExperienceSchema)
  .and(languageKnowledgeSchema)
  .and(educationSchema);

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValues: FormSchema = {
  fullName: "",
  hasWorkExperience: false,
  knowsOtherLanguages: false,
  educationLevel: "noFormalEducation",
};

export { formDefaultValues, formSchema, type FormSchema };
