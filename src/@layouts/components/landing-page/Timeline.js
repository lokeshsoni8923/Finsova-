import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Step One", desc: "We analyze your requirements and create a plan." },
  { id: 2, title: "Step Two", desc: "We provide tailored financial solutions." },
  { id: 3, title: "Step Three", desc: "We help you scale and grow your business." },
];

export default function Timeline() {
  return (
    <section className="py-20 bg-white" id="timeline">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Process</h2>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="p-6 rounded-lg shadow-md border border-gray-200 text-left"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
