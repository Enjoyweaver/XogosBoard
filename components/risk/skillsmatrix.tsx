import React, { useState } from "react";

const SkillsMatrix = () => {
  // Sample initial data - in production you would load this from your database
  const [directors, setDirectors] = useState([
    { id: 1, name: "Director 1" },
    { id: 2, name: "Director 2" },
    { id: 3, name: "Director 3" },
    { id: 4, name: "Director 4" },
    { id: 5, name: "Director 5" },
    { id: 6, name: "Director 6" },
    { id: 7, name: "Director 7" },
  ]);

  const skillCategories = [
    {
      name: "Core Governance Skills",
      skills: [
        { id: "strategic", name: "Strategic Planning", target: 5 },
        { id: "leadership", name: "Board Leadership", target: 3 },
        { id: "financial", name: "Financial Oversight", target: 3 },
        { id: "risk", name: "Risk Management", target: 3 },
        { id: "legal", name: "Legal/Regulatory Compliance", target: 2 },
        { id: "tech", name: "Technology Governance", target: 2 },
      ],
    },
    {
      name: "Educational Content and Assessment",
      skills: [
        { id: "curriculum", name: "K-12 Curriculum Standards", target: 2 },
        { id: "gamedesign", name: "Educational Game Design", target: 2 },
        { id: "assessment", name: "Learning Assessment Methods", target: 1 },
        { id: "edtech", name: "Education Technology Trends", target: 2 },
        { id: "accessibility", name: "Accessibility in Education", target: 1 },
      ],
    },
    {
      name: "Cryptocurrency and Blockchain",
      skills: [
        { id: "blockchain", name: "Blockchain Fundamentals", target: 2 },
        { id: "crypto", name: "Cryptocurrency Operations", target: 2 },
        { id: "tokenomics", name: "Token Economics", target: 2 },
        { id: "cryptoreg", name: "Crypto Regulatory Landscape", target: 2 },
        { id: "security", name: "Digital Asset Security", target: 1 },
      ],
    },
    {
      name: "Youth Protection and Data Privacy",
      skills: [
        { id: "childprotection", name: "Child Online Protection", target: 2 },
        { id: "dataprivacy", name: "Student Data Privacy", target: 2 },
        { id: "gaming", name: "Responsible Gaming Practices", target: 1 },
        { id: "identity", name: "Identity Verification", target: 1 },
        { id: "citizenship", name: "Digital Citizenship", target: 1 },
      ],
    },
    {
      name: "Scholarship and Financial Education Models",
      skills: [
        { id: "scholaradmin", name: "Scholarship Administration", target: 2 },
        { id: "highered", name: "Higher Education Financing", target: 1 },
        { id: "finlit", name: "Financial Literacy Education", target: 1 },
        { id: "incentive", name: "Incentive Program Design", target: 2 },
        { id: "impact", name: "Impact Measurement", target: 1 },
      ],
    },
  ];

  // Sample data - in production you would load this from your database
  const [ratings, setRatings] = useState({});

  // Initialize with empty ratings if needed
  React.useEffect(() => {
    const initialRatings = {};

    directors.forEach((director) => {
      skillCategories.forEach((category) => {
        category.skills.forEach((skill) => {
          const key = `${director.id}-${skill.id}`;
          if (ratings[key] === undefined) {
            initialRatings[key] = 0;
          }
        });
      });
    });

    if (Object.keys(initialRatings).length > 0) {
      setRatings((prev) => ({ ...prev, ...initialRatings }));
    }
  }, [directors, skillCategories]);

  const handleRatingChange = (directorId, skillId, value) => {
    const key = `${directorId}-${skillId}`;
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 4:
        return "bg-green-800 text-white";
      case 3:
        return "bg-green-500 text-white";
      case 2:
        return "bg-yellow-400";
      case 1:
        return "bg-orange-400";
      case 0:
      default:
        return "bg-red-500 text-white";
    }
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 4:
        return "Expert";
      case 3:
        return "Proficient";
      case 2:
        return "Basic";
      case 1:
        return "Limited";
      case 0:
      default:
        return "None";
    }
  };

  const analyzeGaps = (skillId) => {
    const proficientCount = directors.reduce((count, director) => {
      const key = `${director.id}-${skillId}`;
      return ratings[key] >= 3 ? count + 1 : count;
    }, 0);

    const skill = skillCategories
      .flatMap((category) => category.skills)
      .find((s) => s.id === skillId);

    if (skill) {
      if (proficientCount >= skill.target) {
        return "Met";
      } else {
        return `Need ${skill.target - proficientCount} more`;
      }
    }
    return "";
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Xogos Gaming Board Skills Matrix
      </h1>

      <div className="mb-4 p-3 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Rating Scale</h2>
        <ul className="text-sm">
          <li className="mb-1">
            <span className="font-bold">Expert (4):</span> Extensive
            professional experience; recognized authority
          </li>
          <li className="mb-1">
            <span className="font-bold">Proficient (3):</span> Solid working
            knowledge and practical experience
          </li>
          <li className="mb-1">
            <span className="font-bold">Basic (2):</span> Fundamental
            understanding but limited experience
          </li>
          <li className="mb-1">
            <span className="font-bold">Limited (1):</span> Minimal knowledge;
            needs education
          </li>
          <li>
            <span className="font-bold">None (0):</span> No knowledge or
            experience
          </li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        {skillCategories.map((category) => (
          <div key={category.name} className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{category.name}</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border-b border-r text-left">
                    Skill Area
                  </th>
                  {directors.map((director) => (
                    <th
                      key={director.id}
                      className="p-2 border-b border-r text-center"
                    >
                      {director.name}
                    </th>
                  ))}
                  <th className="p-2 border-b border-r text-center">Target</th>
                  <th className="p-2 border-b text-center">Gap Analysis</th>
                </tr>
              </thead>
              <tbody>
                {category.skills.map((skill) => (
                  <tr key={skill.id}>
                    <td className="p-2 border-b border-r">{skill.name}</td>
                    {directors.map((director) => {
                      const key = `${director.id}-${skill.id}`;
                      const rating = ratings[key] || 0;
                      return (
                        <td
                          key={director.id}
                          className="p-2 border-b border-r text-center"
                        >
                          <select
                            className={`p-1 rounded w-12 ${getRatingColor(rating)}`}
                            value={rating}
                            onChange={(e) =>
                              handleRatingChange(
                                director.id,
                                skill.id,
                                parseInt(e.target.value)
                              )
                            }
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </td>
                      );
                    })}
                    <td className="p-2 border-b border-r text-center">
                      {skill.target} at level 3+
                    </td>
                    <td className="p-2 border-b text-center">
                      {analyzeGaps(skill.id)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-3">
          Priority Development Areas
        </h2>
        <div className="mb-6">
          <p className="mb-2">
            Based on the current assessment, these skill areas need development:
          </p>
          <ul className="list-disc pl-5">
            {skillCategories
              .flatMap((category) =>
                category.skills.filter((skill) => {
                  const proficientCount = directors.reduce(
                    (count, director) => {
                      const key = `${director.id}-${skill.id}`;
                      return ratings[key] >= 3 ? count + 1 : count;
                    },
                    0
                  );
                  return proficientCount < skill.target;
                })
              )
              .map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkillsMatrix;
