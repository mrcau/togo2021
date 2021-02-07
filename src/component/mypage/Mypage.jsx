import React from 'react';
import { useForm } from "react-hook-form";
import "./mypage.css";

function Mypage(props) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(watch("example")); 

  return (
    <div className="mypage">
      <div className="mypageTop"><div className="logo"/>My page</div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <input name="example" defaultValue="test" ref={register} />
            <input name="exampleRequired" ref={register({ required: true })} />
      {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" />
    </form>
    </div>
  );
}

export default Mypage;


