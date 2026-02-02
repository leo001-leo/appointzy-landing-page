import { motion } from "motion/react";
import calendarScreenshot from "figma:asset/976d16c8d36906b1f7c4337ef7dcd5146625eaa7.png";

export function ProductPreview() {
  return (
    <section className="w-full px-4 py-12 md:py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl">Your schedule, beautifully organized</h2>
          <p className="text-lg text-muted-foreground">
            Clean, intuitive design that makes managing appointments effortless
          </p>
        </motion.div>
        
        {/* Calendar screenshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-full mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-border">
            <img
              src={calendarScreenshot}
              alt="Appointzy weekly calendar interface"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}