import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BigNumber, ethers } from "ethers";

import { useStateContext } from "../context";
import { money } from "../assets";
import { CustomButton, FormField, Loader } from "../components";
import { checkIfImage } from "../utils";




const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
    salary: "",
    family: "",
  });

  const handleFormFieldChange = (fieldName, e) => {

    // if(fieldName === "target"){
    //   const target = e.target.value;
    //   setForm({...form, [fieldName]: ethers.utils.parseEther(target,"ethers")});
    // if(fieldName === "deadline"){
    //   const date = new Date(e.target.value);
    //   const formattedDate = date.toISOString().split("T")[0];
    //   setForm({...form, [fieldName]: formattedDate});
    // }else if(fieldName === "deadline"){
    //   const date = new Date(e.target.value).getTime();
    //   setForm({...form, [fieldName]: BigNumber.from(date)});
    // }
    // else{
      setForm({ ...form, [fieldName]: e.target.value });
    // }
   
  };

  const priority = form.salary && form.family
  ? (parseFloat(form.salary) / parseFloat(form.family)).toFixed(2)
  : null;


  const handleSubmit = async (e) => {
    e.preventDefault();
    checkIfImage(form.image,async(exists)=>{
      if(exists){
        setIsLoading(true);
        console.log(form);
        await createCampaign(
          {...form, 
            title: form.title, 
            description: form.description, 
            target: ethers.utils.parseEther(form.target,18),
            deadline: form.deadline,
            image: form.image,
            priority:form.priority, // ➔ add priority
          }
        );
        
        setIsLoading(false);
        navigate("/");
      }else{
        alert("Provide valid image URL");
        setForm({...form, image:""})
      }
    });

    


  };

  return (
    <div
      className="bg-[#e9faedfd] flex justify-center items-center flex-col 
    rounded-[10px] sm:p-10 p-4"
    >
      {isLoading && <Loader />}
      <div
        className="flex justify-center items-center p-[16px] sm:min-w-[380px]
    bg-[#932aa3] rounded-[10px]"
      >
        <h1
          className="font-epilogue font-bold sm:text-[25px] text-[18px] 
      leading-[38px] text-[#f4f2f5]"
        >
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>
        <FormField
          labelName="Campaign Details *"
          placeholder="Write a details about your campaign"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>
        <FormField
          labelName="Campaign Image *"
          placeholder="Place image URL here"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

          
          
          personal details *
          
          <FormField
            labelName="Monthly Salary *"
            placeholder="EX:  35000 LKR"
            inputType="number"
            value={form.salary}
            handleChange={(e) => handleFormFieldChange("salary", e)}
          />


         
          <FormField
            labelName="Number Of Family Members *"
            placeholder="EX:  4"
            inputType="number"
            value={form.family}
            handleChange={(e) => handleFormFieldChange("family", e)}
          />
         
         {priority && (
  <div className="flex flex-col">
    <label className="font-epilogue font-semibold text-[14px] mb-2">
      Priority value = (Salary ÷ Family Members)
    </label>
    <div className="bg-[#fff] rounded-[10px] p-3 text-[16px] font-epilogue">
      {priority}
    </div>
  </div>
)}

         
         


        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#932aa3]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;



//#e9faedfd  form color
//custom button bg #932aa3

