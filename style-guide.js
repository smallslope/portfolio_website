var primaryColors = [
{
    swatch_name: "primary-200",
    swatch_hex: "#EDAB98",
    swatch_hsl:"hsl(13, 70%, 76%)"
    
},
{
    swatch_name: "primary-300",
    swatch_hex: "#E2785A",
    swatch_hsl:"hsl(13, 70%, 62%)"
    
},
{
    swatch_name: "primary-500",
    swatch_hex: "#DA5530",
    swatch_hsl:"hsl(13, 70%, 52%)"
    
},
{
    swatch_name: "primary-700",
    swatch_hex: "#A93D1E",
    swatch_hsl:"hsl(13, 70%, 39%)"
    
},
]
var secondaryColors = [
    {
        swatch_name: "secondary-200",
        swatch_hex: "#E2E8CB",
        swatch_hsl:"hsl(72, 39%, 85%)"
        
    }
]
var neutralColors = [
    {
        swatch_name: "neutral-0",
        swatch_hex: "#FAFBF6",
        swatch_hsl:"hsl(72, 39%, 97%)"
        
    },
    {
        swatch_name: "neutral-500",
        swatch_hex: "#808080",
        swatch_hsl:"hsl(0, 0%, 50%)"
        
    },
    {
        swatch_name: "neutral-900",
        swatch_hex: "#232323",
        swatch_hsl:"hsl(0, 0%, 14%)"
        
    }
];

window.addEventListener("DOMContentLoaded", () => {
    const primaryColorList = document.getElementById("primary-list");
    const secondaryColorList = document.getElementById("secondary-list");
    const neuturalColorList = document.getElementById("neutral-list");
    primaryColorList.data = primaryColors;
    secondaryColorList.data = secondaryColors;
    neuturalColorList.data = neutralColors;
  });
