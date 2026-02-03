import { Shield, Award, FileCheck } from "lucide-react";

const complianceItems = [
  {
    icon: Award,
    title: "Hazmat Certified",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
  },
  {
    icon: FileCheck,
    title: "DOT Compliant",
  },
];

const ComplianceBar = () => {
  return (
    <section className="py-8 bg-muted border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {complianceItems.map((item) => (
            <div 
              key={item.title}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <item.icon className="h-6 w-6 text-safety" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComplianceBar;
