import React, { useState } from "react";
import "./FAQ.css";
import img from './assets/img.png'

const faqData = [
    {
      question: "Why choose our medical for your family?",
      answer:
        "We provide top-notch medical services with a family-friendly environment.",
    },
    {
      question: "Why we are different from others?",
      answer:
        "Our commitment to personalized care and advanced technology sets us apart.",
    },
    {
      question: "Trusted & experience senior care & love",
      answer:
        "Our experienced staff offers compassionate care for seniors, ensuring their well-being.",
    },
    {
      question: "How to get appointment for emergency cases?",
      answer:
        "You can call our emergency hotline or visit our website to book an urgent appointment.",
    },
  ];
  
    const [selected, setSelected] = useState(null);
  
    const toggle = (i) => {
      setSelected(selected === i ? null : i);
    };
const Contentimage = () => {
    
  return (
    <div className="faq">
    <h2 className="heading">Frequently Asked Questions</h2>
    <div className="faq-container">
      <div className="faq-left">
        {/* Replace this with your image */}
        <img src={img} className="faq-image"/>
      </div>
      <div className="faq-right">
        {faqData.map((item, i) => (
          <div key={i} className="faq-item">
            <div className="faq-question" onClick={() => toggle(i)}>
              {item.question}
              <span>{selected === i ? "-" : "+"}</span>
            </div>
            <div className={`faq-answer ${selected === i ? "show" : ""}`}>
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Contentimage