import React from "react";
import { Button, TextField, Select, MenuItem, Input, InputLabel, FormControl } from "@material-ui/core";
import { object, string } from "yup";

export const validationSchema = object({
    title: string("Enter Title of Post")
        .required("Title is required"),
    category: string("Choose category")
        .required("You must choose a category")
});

export const PostForm = (props) => {
    const {
        values: { author, body, category, title },
        categories,
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
       id="title"
       name="title"
       label="Title"
       value={title}
       helperText={touched.title ? errors.title : ""}
       error={touched.title && Boolean(errors.title)}
       onChange={change.bind(null, "title")}
       fullWidth
     />

     <InputLabel shrink htmlFor="age-label-placeholder">
            Category
    </InputLabel>
     <Select
       id="category"
       name="category"
       value={category}
       input={<Input name="category" id="category-label-placeholder" disabled={edit} />}
       onChange={change.bind(null, "category")}
       fullWidth
       label="Category"
     >
        {Object.values(categories).map((c) => 
            <MenuItem value={c.path} key={c.path}>{c.name}</MenuItem>
        )}
     </Select>

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
       Add Post
     </Button>
   </form>
 );
};