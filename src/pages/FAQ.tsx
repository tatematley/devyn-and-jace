import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is the dress code?",
    answer:
      "We would love to see our family and friends in semi-formal attire! Men wearing a suit or a blazer with dress pants and dress shoes, ties optional. Women in cocktail dresses, midi dresses, jumpsuits, or tailored pantsuits. Since all events are outdoors, we also recommend opting for block heels or flats, as the celebration will take place on grass.",
  },
  {
    question: "When should I RSVP by?",
    answer:
      "Please submit your RSVP by July 1st so we can ensure everything is perfectly in order for our big day!",
  },
  {
    question: "Will the ceremony and reception be indoors or outdoors?",
    answer:
      "All events throughout our wedding weekend will be entirely outdoors! The Shenandoah Valley in mid-September is typically beautiful — expect highs around 77°F and cooler evenings near 57°F — but September in the valley can bring the occasional surprise. We recommend bringing a light layer for the evening and choosing comfortable footwear suited for grass. Come ready to celebrate rain or shine!",
  },
  {
    question: "What time should I arrive to the ceremony?",
    answer:
      "Please plan to be at the ceremony location by 4:30 to find your seat. The ceremony will begin promptly at 4:45.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="page">
      <div
        className="page-hero has-photo"
        style={{ backgroundImage: "url('/images/FAQ.jpeg')", backgroundPosition: 'center 70%' }}
      >
        <span className="section-label">Everything You Need to Know</span>
        <h1>FAQ</h1>
        <p>Answers to the questions we get asked most.</p>
      </div>

      <section className="section">
        <div className="container">
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${openIndex === i ? ' open' : ''}`}>
                <button className="faq-question" onClick={() => toggle(i)}>
                  {faq.question}
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
