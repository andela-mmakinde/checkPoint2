const mockData = {
  adminDetails: {
    email: 'mayowa@andela.com',
    password: 'andela'
  },
  userDetails: {
    email: 'amaa@la.com',
    password: 'amala',
  },
  incompleteRole: {
    noTitle: ''
  },
  roleOne: {
    title: 'observer',
  },
  admin: {
    fullName: 'Mayowa Oriyomi',
    email: 'mayowamak@gmail.com',
    password: 'andela',
    confirmPassword: 'andela',
    roleId: 1
  },
  user: {
    fullName: 'Solomon Fibonacci',
    email: 'fibbo@gmail.com',
    password: 'andela',
    confirmPassword: 'andela',
    roleId: 2
  },
  user3: {
    fullName: 'Teddy Fibo',
    email: 'teddy@gmail.com',
    password: 'andela',
    confirmPassword: 'andela',
    roleId: 2
  },
  user4: {
    fullName: 'Mayowa Mayor',
    email: 'mayor@gmail.com',
    password: 'andela',
    confirmPassword: 'andela',
    roleId: 1
  },
  passwordMismatch: {
    fullName: 'Mayowa Mayor',
    email: 'may@gmail.com',
    password: 'andela',
    confirmPassword: 'wrongPassword',
    roleId: 1
  },
  invalidEmail: {
    fullName: 'Mayowa Mayor',
    email: 'mayor@mayor',
    password: 'andela',
    confirmPassword: 'andela',
    roleId: 1
  },
  incompleteUserData: {
    fullName: 'Solomon Fibonacci',
    password: 'andela',
    confirmPassword: 'andela',
    roleId: 2
  },
  user5: {
    fullName: 'Bamidele Daniel',
    email: 'daniel@andela.com',
    password: 'andela',
    confirmPassword: 'andela',
    roleId: 1
  },
  user6: {
    fullName: 'Efeguono Efekemo',
    email: 'eguono@andela.com',
    password: 'andela',
    confirmPassword: 'andela',
    roleId: 2
  },
  document1: {
    title: 'Number One',
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    access: 'Public'
  },
  document2: {
    title: 'Number Two',
    content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)',
    access: 'Private'
  },
  document3: {
    title: 'Number Three',
    content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    access: 'Role'
  },
  document4: {
    title: 'Number Four',
    content: 'Passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    access: 'Role'
  },
  incompleteDocument: {
    content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
    access: 'Role'
  },
};
export default mockData;
