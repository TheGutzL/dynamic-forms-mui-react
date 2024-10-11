import { zodResolver } from "@hookform/resolvers/zod";
import { AddCircleRounded, DeleteForeverRounded } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import Container from "./Container";
import { formDefaultValues, formSchema, FormSchema } from "./formSchema";

function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormSchema>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const { fields, replace, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  const fullErrors: FieldErrors<
    Extract<FormSchema, { hasWorkExperience: true }>
  > &
    FieldErrors<Extract<FormSchema, { knowsOtherLanguages: true }>> &
    FieldErrors<Extract<FormSchema, { educationLevel: "noFormalEducation" }>> &
    FieldErrors<Extract<FormSchema, { educationLevel: "highSchoolDiploma" }>> &
    FieldErrors<Extract<FormSchema, { educationLevel: "bachelorsDegree" }>> =
    errors;

  const knowsOtherLanguages = useWatch({
    control,
    name: "knowsOtherLanguages",
  });
  const hasWorkExperience = useWatch({ control, name: "hasWorkExperience" });
  const educationLevel = useWatch({ control, name: "educationLevel" });

  useEffect(() => {
    if (knowsOtherLanguages) {
      replace([{ name: "" }]);
    }
  }, [knowsOtherLanguages, replace]);

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Container>
      <TextField
        {...register("fullName")}
        label="Full Name"
        helperText={fullErrors.fullName?.message}
        error={!!fullErrors.fullName}
      />
      <FormControlLabel
        {...register("hasWorkExperience")}
        label="Word Experience?"
        control={<Checkbox />}
      />
      {hasWorkExperience && (
        <TextField
          {...register("companyName")}
          label="Company Name"
          helperText={fullErrors.companyName?.message}
          error={!!fullErrors.companyName}
        />
      )}
      <FormControlLabel
        {...register("knowsOtherLanguages")}
        label="Know Other Languages"
        control={<Checkbox />}
      />
      {knowsOtherLanguages && (
        <>
          {fields.map((field, index) => (
            <div key={field.id}>
              <TextField
                sx={{ width: "100%" }}
                {...register(`languages.${index}.name`)}
                label="Language Name"
                helperText={fullErrors.languages?.[index]?.name?.message}
                error={!!fullErrors.languages?.[index]?.name?.message}
              />
              <IconButton
                disabled={fields.length === 1}
                onClick={() => remove(index)}
                color="error"
              >
                <DeleteForeverRounded />
              </IconButton>
            </div>
          ))}
          <IconButton
            sx={{ width: "fit-content" }}
            onClick={() => append({ name: "" })}
            color="success"
          >
            <AddCircleRounded />
          </IconButton>
        </>
      )}

      <FormControl>
        <FormLabel>Education Level</FormLabel>
        <Controller
          control={control}
          name="educationLevel"
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="noFormalEducation"
                control={<Radio />}
                label="No Formal Education"
              />
              <FormControlLabel
                value="highSchoolDiploma"
                control={<Radio />}
                label="High School Diploma"
              />
              <FormControlLabel
                value="bachelorsDegree"
                control={<Radio />}
                label="Bachelor's Degree"
              />
            </RadioGroup>
          )}
        />
      </FormControl>

      {educationLevel === "highSchoolDiploma" && (
        <TextField
          {...register("schoolName")}
          label="School Name"
          helperText={fullErrors.schoolName?.message}
          error={!!fullErrors.schoolName?.message}
        />
      )}

      {educationLevel === "bachelorsDegree" && (
        <TextField
          {...register("universityName")}
          label="University Name"
          helperText={fullErrors.universityName?.message}
          error={!!fullErrors.universityName?.message}
        />
      )}

      <Button
        variant="contained"
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </Container>
  );
}

export { App };
