import { motion } from "framer-motion";

function ProgressCircle({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const percentage = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="progress-wrapper">
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#eee"
          strokeWidth="10"
          fill="none"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="50"
          stroke="#667eea"
          strokeWidth="10"
          fill="none"
          strokeDasharray="314"
          strokeDashoffset={314 - (314 * percentage) / 100}
          initial={{ strokeDashoffset: 314 }}
          animate={{ strokeDashoffset: 314 - (314 * percentage) / 100 }}
          transition={{ duration: 0.6 }}
        />
      </svg>
      <div className="progress-text">
        {Math.round(percentage)}%
      </div>
    </div>
  );
}

export default ProgressCircle;