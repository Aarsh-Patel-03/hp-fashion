export default function Footer() {
  const footerData = {
    Shop: [
      "HP Fashion Studio",
      "3rd Floor, Orion Mall",
      "SG Highway, Ahmedabad",
      "Gujarat, India – 380054",
    ],

    Shop2: [
      "HP Fashion Studio",
      "3rd Floor, Orion Mall",
      "SG Highway, Ahmedabad",
      "Gujarat, India – 380054",
    ],

    Contact: [
      "Name: Harshil Patel",
      "Phone: +91 93139 88435",
    ],

    "Follow Us": [
      "Instagram: @hpfashion",
      "Facebook: @hpfashion",
      "Twitter: @hpfashion",
    ],
  };
  return (
    <div className="mt-16 border-t border-white/10 px-6 md:px-16 py-12 grid  md:grid-cols-4 gap-6 text-gray-400 text-sm">
      <div>
        <h4 className="text-white font-bold mb-4">HP Fashion</h4>
        <p>Modern streetwear for the bold generation.</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
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

      <div className="copyright">© 2026 Your HP Fashion.</div>
      <div className="text-center">Made with ❤️ by AP</div>
    </div>
  );
}