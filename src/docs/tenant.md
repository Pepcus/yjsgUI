# Guide to add new tenant into the EMS application:

## Basic Setup
### Add tenant name
 - app.json file:-    
   add app.json file in ui_config folder this file contains one object and that object as three properties that are
    environment(environment of application such as production or development), isRegisterCorrectionEnabled(registration
    correction form is enable or not), tenant(application tenant name).
    ######example:
           {
             "environment": "production",
             "isRegisterCorrectionEnabled": true,
             "tenant": "YJSG-Indore"
           }
 - yjsg.js file:-    
   yjsg.js file present inside src/constants folder. yjsg.js file contains tenant name inside TENANT object 
   ######example:
       export const TENANT = {
         DEFAULT: 'default',
       };  
     
### Add tenant directory
 - Tenant directory for Image, Icon and Logo :-    
   Add tenant directory for logo,
   image and icon in src/assets/image/(tenant name folder)
 - Tenant directory for application configuration :-    
   Add tenant directory in src/config/tenant/(tenant name folder) folder
 - Tenant directory for APIs header and response request formatters :-    
   Add tenant directory for APIs header formatters,request formatters and response formatters
   in src/utils/apis/formatters/(tenant name folder)
 
 #### Tenant directory for Image, Icon and Logo
 - Add tenant directory for logo, image and icon in src/assets/image/(tenant name folder)
   folder
   - Significance:    
     It contains all images, logo and icon files of the png type.
     - header logo:     
       Add header logo in headerLogo.png file
     - favicon:    
       Add favicon in LOGO.png file
     - Page body logo:    
       Add page body logo in pageBodyLogo.png file  
         
 #### Tenant directory for application configuration
 - Add tenant directory in src/config/tenant/(tenant name folder)
   folder
   - Significance:    
     It contains all application configuration for tenant-specific
     ##### Setting up API endpoints
     - api folder:-     
       It contains api.josn file. The api.json file contains all apis configuration object and config
       object of default headers.
       - apis object:-     
         apis configuration object contains different types of objects as per there type such as login, member, file etc.
         And that different types of object contains different apis objects as per the object type such as login object contains loginAdmin api object
         and member object contains getMember api object, getMembers api object, createMember api object, updateMember api, object etc.
         The api object contains two properties method, url, and headers object. The header object contains header of api such as Content-type.
       
       - config object:-    
         config object contains defaultHeaders object and defaultBaseUrl property.
         defaultHeaders contains apis headers parameters such as Content-type and Accept.
         defaultBaseUrl contains default base url for all apis.
       - ######example:
               {
                 "config": {
                   "defaultHeaders": {
                     "Content-type": "application/json",
                     "Accept": "application/json"
                   },
                   "defaultBaseUrl": ""
                 },
                 "apis": {
                   "member": {
                     "getMember": {
                       "method": "GET",
                       "url": "v1/students/${id}"
                     },
                     "getMembers": {
                       "method": "GET",
                       "url": "src/config/tenant/default/membersData.json"
                     },
                     "uploadAttendanceFile": {
                       "method": "PATCH",
                       "url": "v1/students/bulk-attendance"
                     },
                   }
                 }
               }  
     ##### Setting up application constants
     - constants folder:-    
       constants folder contains text.json file. The text.json file contains
       all text constants such as
        ######example: 
                 {
                   "PLEASE_SELECT_ANY_ONE_TEXT": "कृपया एक चुनिए . . .",
                   "UPDATE_FURTHER_INFORMATION_TEXT": "कृपिया अन्य जानकारी बदलने हेतु यहाँ", etc.
                 }
     ##### Setting up configuration for each route    
     - routes folder:-     
       routes folder contains all routes config files.
       Such as home.json, memberInformationGrid.json, memberRegistration.json and 
       memberRegistrationCorrection.json
       
       - home.json:-    
         It contains home page configuration that is default rout configuration that configuration contains
         one object. Object has two properties one is name and other is homePageButtons object. homePageButtons object
         has two properties one is memberLogin (member login button visible of not) and other is memberCreate (member 
         create button visible or not)
       
       - memberCredentialPage.json:-    
         It contains one object that is memberCredentialFormConfig.
         This object has member credential form schema.
       
       - memberInformationGrid.json:-    
         It contains
         - two array that are
           - gridMetaData:-   
             gridMetaData array contains objects of each column of information grid and that object contains six properties
             that are
             - label(column label),
             - key(column key),
             - disableFilter(is column filter present or not),
             - excludeFromExport(exclude for csv file export),
             - emptyCells(if value is not present in that column cell thant default value),
             - type(which type value contains that column cell such as Number or string).
           - columnList:-    
             columnList is the array of each column option object of columnConfiguration and that object contains two
             properties label(column label) and key(column key). 
         - and objects that are
           - advanceSearchSchema:-    
             advanceSearchSchema object contains advance search form schema.
           - columnConfigSchema:-    
             columnConfigSchema object contains column config schema.
           - opInModalFormSchema:-    
             opInModalFormSchema object contains opIn modal form schema.
           - attendanceModalFormSchema:-    
             attendanceModalFormSchema object contains attendance modal form schema.
           - updateIdCardStatusModalFormSchema,
             updateIdCardStatusModalFormSchema object contains update Id-card status modal form schema.
           - attendanceFileModalFormSchema:-    
             attendanceFileModalFormSchema object contains attendance file modal form schema.
           - optInFileModalFormSchema:-    
           optInFileModalFormSchema object contains optIn file modal form schema.
         - and properties that are
           - isAdvanceSearchEnable (Is advance search feature enable or not),
           - isUpdateOptInEnable (Is update OptIn feature enable or not),
           - isUpdateAttendanceEnable (Is update attendance feature enable or not),
           - isUpdateIdCardStatusEnable (Is update Id-card status feature enable or not),
           - isUploadAttendanceFileEnable (Is upload attendance file feature enable or not),
           - isUploadOptInFileEnable (Is upload optIn file feature enable or not),
           - isIdCardPrintEnable (Is Id-card print feature enable or not),
           - isCSVExportEnable (Is CSV export feature enable or not).
       
       - memberRegistration.json:-    
         It contains registrationFormConfig object and that registrationFormConfig object
         contains schema and uiSchema.
       
       - memberRegistrationCorrection.json :-    
         - It contains three form config objects that are
           - adminFormConfig :-    
             adminFormConfig object contains schema object, uiSchema object and defaultMemberDataFormat array.
             The defaultMemberDataFormat array is array of objects and that object contains two properties one is
             formField(form field name) and another is dataType(data type such as string, number).
           - memberFormConfig:-    
             memberFormConfig object contains schema object, uiSchema object and defaultMemberDataFormat array.
             The defaultMemberDataFormat array is array of objects and that object contains two properties one is
             formField(form field name) and another is dataType(data type such as string, number).
           - onlyOptInFormConfig:-    
             onlyOptInFormConfig object contains schema object, uiSchema object and defaultMemberDataFormat array.
             The defaultMemberDataFormat array is array of objects and that object contains two properties one is
             formField(form field name) and another is dataType(data type such as string, number).
         - and one property
           - isOptInEnable:-    
             isOptInEnable(boolean) property is use for OptIn feature disable or enable.
         
       - parentsRegistrationForm.json :-    
         It contains one object that is parentsRegistrationFormSchema. This object has
         parents Registration form schema.
        
       - splashPage.json :-    
         It contains one object that is adminLoginFormSchema. This object has admin login form schema.
     
     ##### Application configuration setup (app.json)   
     - app.json file:-    
      It contains application configuration of tenant specific that includes
       - title property:-    
         title is the default header title of application.
       - footerTitle property,
         footerTitle is the default application footer title.
       - routes array:-    
         routes array is the array of rout configuration and that route configuration object contains
           - name property:-    
             name property is contains route name.
           - path property:-  
             path property contains route path.  
           - component property:-     
             component property contains component name which will render for the route.
           - config property:-     
             config property contains config file name of that route.
           - isActive property:-     
             isActive property is of type boolean and it decide that route is active or not.
           - header object:-     
             header object contains route header configuration it include
             - titleStyle object(contains title css style),
             - logo property(type boolean and decide logo is present in route header or not),
             - hasButtons property(type boolean and decide button is present in route header or not),
             - backButton property(type boolean and decide back button present in the route header or not),
             - backButtonRedirectTo property(it contains redirection path of back button),
             - logoutButton property(type boolean and decide logout button present in the route header or not),
             - logoutButtonRedirectTo property(it contains redirection path of back button),
             - title property(header title of route specific),
             - headerWrapperStyle object(contains header wrapper css style)
           - footer object:-     
             footer object contains route footer configuration it include
             - titleStyle object(contains title css style),
             - footerWrapperStyle object(contains footer wrapper css style),
             - title property(footer title of route specific).
       - logoPathConfig object:-     
         It contains three properties that are
         - LOGO:-    It contains path of LOGO for favicon of application("src/assets/images/(tenant name)/LOGO.png").
         - headerLogo:-     It contains path of headerLogo for header logo of application
           ("src/assets/images/(tenant name)/headerLogo.png").
         - pageBodyLogo:-     It contains path of pageBodyLogo for page body logo of application
           ("src/assets/images/YJSG-Indore/pageBodyLogo.png").
       ######example:
                    {
                      "name": "memberSearch",
                      "path": "/member-search",
                      "component": "MemberInformationGrid",
                      "config": "memberInformationGrid",
                      "isActive": true,
                      "header": {
                        "title": "अभिभावक सम्मलेन (Parents' Convention)",
                        "titleStyle": {
                          "padding": "10px 0px 10px 80px"
                        },
                        "logo": true,
                        "hasButtons": true,
                        "backButton": true,
                        "backButtonRedirectTo": "/admin",
                        "logoutButton": true,
                        "logoutButtonRedirectTo": "/admin"
                      },
                      "footer": {
                        "titleStyle": {},
                        "footerWrapperStyle": {},
                        "title": "प्रकाश छाबड़ा (99260 40137)"
                      }
                    }
     
     ##### Application theme setup (theme.json)   
     - theme.json:-    
       It use for application color theming. This file present inside src/config/tenant/(tenant directory)/theme.json
     
 #### Tenant directory for APIs header and response request formatters      
 - Add tenant directory for APIs header formatters, request formatters and response formatters in
    src/utils/apis/formatters/(tenant name folder)
   
   - Significance:-    
     It contains all APIs header formatters, request formatters and response formatters in headerFormatters.js,
     requestFormatters.js and responseFormatters.js respective file and one index.js file for tenant-specific
     application. The formatters folder also contains index.js file and formatter.js file in which have headerFormatter, requestFormatters
     and responseFormatters object of all APIs.
     - formatters folder:-     
       - tenant name folder:-    
         - headerFormatters.js file :-    
           It contains header formatter functions and have parameters headers, additionalData.
           header is the header of API which is mention in API configuration file, additionalData is the data which will add
           in API header.
         - requestFormatters.js file :-    
           It contains request formatter functions and have one parameter in which request data
           present. request formatter function format request data.
         - responseFormatters.js file :-    
           It contains response formatter functions and have one parameter in which response
           data present. response formatter function format response data.
         - index.js
       - formatter.js file :-    
         It contains headerFormatters, requestFormatters and responseFormatters. The
         headerFormatters object have a property which is all APIs header combine into one object and assign to tenant
         name. requestFormatters object have a property which is all APIs request combine into one object and assign to
         tenant name. responseFormatters object have a property which is all APIs response combine into one object and
         assign to tenant name.
 #### Validation function setup
 - Add validation function of form filed(the function which is mention in form schema as 'customValidation' of tenant
  configuration file of form ) in src/utils/validations/validations.js file
  ######example:
    "email": {
            "title": "E-mail",
            "type": "string",
            "customValidation": "optionalEmailValidator"
          },
          
    optionalEmailValidator is the validation function for email field and it is added in validation.js file.         
        
