export default {
  checkModName(rule, value, callback)
  {
    if (!value)
    {
      callback(new Error('please input module name'));
    } else if (/[a-z]+/.test(value) == false)
    {
      callback(new Error("module name should be  letter with lower case."))
    } else
    {
      callback()
    }
  },
  checkApiName(rule, value, callback)
  {
    console.log("checkModName", /[a-zA-Z/]+/.test(value))
    if (!value)
    {
      callback(new Error('please input module name'));
    } else if (/[a-zA-Z/]+/.test(value) == false)
    {
      callback(new Error("eg:/user/getUser , /user/deleteUser"))
    } else
    {
      callback()
    }
  },
}
