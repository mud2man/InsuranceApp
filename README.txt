1. Dependencies:
    No dependence

2. How to run:
    Open the folder "InsuranceApp", and use browser Chrome to open the index.html. You can pick up any choice from every catagories
like Year, Age Categories, and you need to type into the address. Every row on the address has their example. Please note that you must follow the format. If you live in New Your, then you need to type NY into State box. Otherwise, you will see the pop-up 
indicate "Address not found, please check again !!"

3. Design process:
    I noticed that the database only provides a limited scope of data. Take years as an example, they just provide the data 
between 2006 and 2015. And someting like age categories have a limited options. In order to follow "Error prevention", I designed 
the UI as a list of check boxes, and users can click the check boxes to get their information without any error occurred. 
    
    On the addrss part, users need to put a string of address, but users may have some typo, or they didn't follow the format. I 
implement a validation. When the user make some mistakes, there will be a pop-up "Address not found, please check again !!" showing
up. This design meet one of the ten evaluation heuristics "Help users recognize, diagnose, and recover from errors".
    
    If everyting is fine, we will display a set of information based on users's input. However, if there is no data, it will shows
a string "Sorry we have no data that year !!". This design meet the rule "Visibility of system status", because it prevents users 
think this system is busy if it didn't show anything. Moreover, I adopted bootstrap to make my query table prieter. Every 
consecutive row have different colors, which make users more confortable when thet read the table. Again, this feature meets the 
rule "Aesthetic and minimalist design".   
    
