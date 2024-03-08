import { useForm } from "react-hook-form";
import { Form } from "../ui/form";

const CustomerModal = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data:any) => {
      console.log(data);
    };

    

    return (
       
        <Form>
         <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name', { required: true })} />
        {errors.name && <p>Name is required.</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email', { required: true })} />
        {errors.email && <p>Email is required.</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password', { required: true })} />
        {errors.password && <p>Password is required.</p>}
      </div>

      <button type="submit">Register</button>
    </form>
      </Form>
    )
}

export default CustomerModal;