import React, { useReducer } from "react";

export default (reducer, actions, initialState) => {
  // Aşağıdaki fonksiyon kullanılarak bir bağlam (context) nesnesi oluşturulur.
  // Bu bağlam, bileşenler arasında paylaşılmak üzere verileri iletmek için kullanılacak.
  const Context = React.createContext();

  // Aşağıdaki şekilde fonksiyonel bileşen oluşturulur ve bu bileşen children adında bir prop alır.
  // Bu bileşen, verileri iletmek istediğiniz bileşenlerin sarılı olacağı bir bileşenin temelini oluşturur.
  const Provider = ({ children }) => {
    // state güncellemek için useReducer kullanıyoruz.
    const [state, dispatch] = useReducer(reducer, initialState);

    // Aşağdıdaki bileşen, içine sarılı olan bileşenlere bağlamdaki verileri iletmek için kullanılır.
    //  {children} prop'u, bu bileşenin içine yerleştirilen diğer bileşenleri temsil eder. Bağlamın içeriği bu bileşenin içinde tanımlanmalıdır.
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    //actions=== {addBlogPost: (dispatch) => {return () = {}}}
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};
