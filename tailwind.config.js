/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-red': '#FFA27F',
        
        'custom-gray': '#625C5C',
        
        'custom-grey': '#F0EFEF',

        'custom-yellow': '#F3FF90',

        'custom-brownnav': '#603F26',

        'custom-brownbg': '#FAF4FF',

        'custom-textcolor':'#FAF4FF',
        
        'custom-brownbglight': '#A47E3B',

        'custom-green': '#DEF9C4',
        'lightp': '#F1F1F3',
        'darkp': '#53526D ', // Replace with your light yellow color code
        'midp': '#903775', 
        'pink':'#D43E7F',
      },
    },
    boxShadow: {
      'custom-darkblue': '0 4px 6px -1px rgba(54, 53, 83, 0.5)', // Custom shadow using your color with some transparency,
      'custom-darkgreen': '0 4px 6px -1px rgba(34, 139, 34, 0.5)', // Custom shadow with a green color and some transparency
      'custom-yellow': '0 4px 6px -1px rgba(255, 223, 0, 0.5)', // Custom shadow with a yellow color and some transparency
      'custom-red': '0 4px 6px -1px rgba(255, 0, 0, 0.5)', // Custom shadow with a red color and some transparency

    },
  },
  plugins: [],
}

