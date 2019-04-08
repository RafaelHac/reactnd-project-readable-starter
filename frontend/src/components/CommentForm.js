import React from "react";
import { Button, TextField, Select, MenuItem, Input, InputLabel, FormControl } from "@material-ui/core";
import { object, string } from "yup";

export const validationSchema = object({
    body: string("Enter comment")
        .required("Comment content is required"),
});

export const CommentForm = (props) => {
    const {
        values: { author, body },
        errors,
        touched,
        handleSubmit,
        handleChange,
        isValid,
        setFieldTouched,
        edit
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };
    return (
   <form onSubmit={handleSubmit}>
     <TextField
       id="author"
       name="author"
       value={author}
       label="Author"
       helperText={touched.author ? errors.author : ""}
       error={touched.author && Boolean(errors.author)}
       disabled={edit}
       onChange={change.bind(null, "author")}
     />
     <TextField
       id="body"
       name="body"
       value={body}
       label="Post"
       helperText={touched.body ? errors.body : ""}
       error={touched.title && Boolean(errors.body)}
       onChange={change.bind(null, "body")}
       fullWidth
     />
     <Button
       type="submit"
       variant="contained"
       color="primary"
       disabled={!isValid}
     >
       {edit ? "Edit" : "Add Comment"}
     </Button>
   </form>
 );
};