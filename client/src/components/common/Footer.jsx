export default function Footer() {
  const footerData = {
    Shop: [
      "HP Fashion Studio",
      "3rd Floor, Orion Mall",
      "SG Highway, Ahmedabad",
      "Gujarat, India – 380054",
    ],

    Contact: [
      "Phone: +91 98765 43210",
      "Email: support@hpfashion.in",
      "Mon–Sat: 10:00 AM – 7:00 PM",
    ],

    "Follow Us": [
      "Instagram: @hpfashion",
      "Facebook: facebook.com/hpfashion",
      "Twitter: @hpfashion",
    ],
  };
  return (
    <div className="mt-32 border-t border-white/10 px-6 md:px-16 py-12 grid md:grid-cols-4 gap-8 text-gray-400 text-sm">
      <div>
        <h4 className="text-white font-bold mb-4">HP Fashion</h4>
        <p>Modern streetwear for the bold generation.</p>
      </div>

      {Object.entries(footerData).map(([title, items]) => (
        <div key={title}>
          <h4 className="text-white font-semibold mb-3">{title}</h4>
          <ul className="space-y-2 text-sm">
            {items.map((item, index) => (
              <li
                key={index}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
