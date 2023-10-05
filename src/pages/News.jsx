// eslint-disable-next-line no-unused-vars
// import React from "react";
// import { Hero, Navbar, Creatures } from "../components";

// const News = () => {
//   return (
//     <div className="relative z-0 bg-primary">
//       <div>News</div>
//     </div>
//   );
// };

// export default News;
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   emailjs
  //     .send(
  //       import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
  //       import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
  //       {
  //         from_name: form.name,
  //         to_name: "JavaScript Mastery",
  //         from_email: form.email,
  //         to_email: "sujata@jsmastery.pro",
  //         message: form.message,
  //       },
  //       import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
  //     )
  //     .then(
  //       () => {
  //         setLoading(false);
  //         alert("Thank you. I will get back to you as soon as possible.");

  //         setForm({
  //           name: "",
  //           email: "",
  //           message: "",
  //         });
  //       },
  //       (error) => {
  //         setLoading(false);
  //         console.error(error);

  //         alert("Ahh, something went wrong. Please try again.");
  //       }
  //     );
  // };
// import emailjs from "@emailjs/browser";


import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components";

import { styles } from "../styles";
import { EarthCanvas } from "../components/canvas";
import { slideIn } from "../utils/motion";
import mailchimp from "@mailchimp/mailchimp_marketing";



const News = () => {



  mailchimp.setConfig({
    apiKey: "40dfc24ba6bb52d0f2db3b13c2524565",
    server: "us17",
  });

  async function run() {
    try {
      const response = await mailchimp.ping.get();
      console.log(response);
    } catch (error) {
      console.error("Mailchimp API Error:", error.message);
    }
  }

  run();
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
    console.log(name, ":", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      // 
      run();


    
      // try {
      //   const response = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`, {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Basic ${Buffer.from(`apikey:${apiKey}`).toString('base64')}`,
      //     },
      //     body: JSON.stringify({
      //       email_address: form.email,
      //       status: 'subscribed',
      //       merge_fields: {
      //         FNAME: form.name,
      //       },
      //     }),
      //   });
    
      // } catch (error) {
      //   console.error(error);
      }

      // const audienceId = '6b16fdf565'; // Replace with your Mailchimp Audience ID
      // const apiKey = '40dfc24ba6bb52d0f2db3b13c2524565-us17'; // Replace with your Mailchimp API Key
      // const dc = 'us17.';

    //   const response = await fetch(
    //     "http://localhost:5000/api/mailchimp/subscribe",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(form),
    //     }
    //   );

    //   if (response.ok) {
    //     console.log("data was sent")
    //     // Handle success (e.g., show a success message)
    //   } else {
    //     // Handle error (e.g., show an error message)
    //   }
    // } catch (error) {
    //   console.error(error);
    //   // Handle network error
    // }
  

  return (
    <div className="bg-primary">
      <Navbar />
      <div
        className={`xl:pt-24  flex xl:flex-row flex-col-reverse gap-10 overflow-hidden ${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl pb-24"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact.</h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-8"
          >
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Your email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              />
            </label>


            <button
              type="submit"
              className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </div>
  );
};

export default News