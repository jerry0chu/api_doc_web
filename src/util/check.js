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
    if (!value)
    {
      callback(new Error('please input module name'));
    } else if (new RegExp("^/[a-zA-Z/]+\\w$").test(value) == false)
    {
      callback(new Error("eg:/user/getUser , /user/deleteUser"))
    } else
    {
      callback()
    }
  },
}
