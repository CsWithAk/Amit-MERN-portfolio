import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SectionTitle from '../common/SectionTitle';
import MarkdownContent from '../common/MarkdownContent';
import { Reveal } from '../animations/Reveal';

export default function FAQs({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!items.length) return null;

  return (
    <section id="faq" data-cursor-section="faq" className="container-x py-20">
      <SectionTitle
        eyebrow="Common questions"
        title="Frequently Asked Questions"
        subtitle="A few quick answers about my work, process and availability."
        center
      />

      <div className="mx-auto grid max-w-4xl gap-3">
        {items.map((item, index) => (
          <Reveal key={item._id || item.question} delay={index * 0.04}>
            <details className="card glass group rounded-card" open={openIndex === index}>
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 text-left font-semibold marker:hidden sm:p-6"
                onClick={(event) => {
                  event.preventDefault();
                  setOpenIndex((current) => (current === index ? null : index));
                }}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={19}
                  className="shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="border-t border-line px-5 pb-5 pt-4 text-sm leading-7 text-muted sm:px-6 sm:pb-6">
                <MarkdownContent>{item.answer}</MarkdownContent>
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
