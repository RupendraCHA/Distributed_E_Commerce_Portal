import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Profile icon
import {
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from '@mui/material'; // MUI components
import { useSelector, useDispatch } from 'react-redux';
import {
  DashboardsData,
  SourcingData,
  ManufacturingData,
  AccountingData,
} from '../../data/PosetraDataPage';
import { setCartItems } from '../../store/cartSlice'; // Import the setCartItems action
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userRole = useSelector((state) => state.auth.user?.role);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElForAccounting, setAnchorElForAccounting] = useState(null);
  const [anchorElForSourcing, setAnchorElForSourcing] = useState(null);
  const [anchorElForManufacturing, setAnchorElForManufacturing] =
    useState(null);
  const [distributorAnchorEl, setDistributorAnchorEl] = useState(null);
  const [text, setText] = useState('');
  // Distribution routes
  const distributorRoutes = [
    {
      title: 'Dashboard',
      path: '/distributor',
    },
    {
      title: 'Registration',
      path: '/distributor/register',
    },
    {
      title: 'Warehouse Management',
      path: '/distributor/warehouses',
    },
    {
      title: 'Inventory Management',
      path: '/distributor/inventory',
    },
  ];

  const server_Url = import.meta.env.VITE_API_SERVER_URL;

  // Fetch cart items when the component is mounted
  useEffect(() => {
    console.log('Called', isLoggedIn);
    if (isLoggedIn) {
      const fetchCartItems = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(server_Url + '/api/v1/cart', {
            headers: { Authorization: `Bearer ${token}` },
          });
          // const response = await axios.get('http://localhost:3002/cart', {
          //   headers: { Authorization: `Bearer ${token}` },
          // });
          dispatch(setCartItems(response.data.cartItems)); // Store cart items in Redux store
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };

      fetchCartItems();
    }
  }, [isLoggedIn, dispatch]);

  // Calculate total count of items in the cart
  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleProfileClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleSouricng = (event) => {
    setAnchorElForSourcing(anchorElForSourcing ? null : event.currentTarget);
  };
  const handleAccounting = (event) => {
    setAnchorElForAccounting(
      anchorElForAccounting ? null : event.currentTarget
    );
  };
  const handleManufacturing = (event) => {
    setAnchorElForManufacturing(
      anchorElForManufacturing ? null : event.currentTarget
    );
  };

  const handleDistributorClick = (event) => {
    setDistributorAnchorEl(distributorAnchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSourcingPopperClose = (path) => {
    navigate(path);
    setAnchorElForSourcing(null);
    setAnchorEl(null);
  };
  const handleAccountingPopperClose = (path) => {
    navigate(path);
    setAnchorElForAccounting(null);
    setAnchorEl(null);
    setAnchorElForSourcing(null);
  };
  const handleManufacturingPopperClose = (path) => {
    navigate(path);
    setAnchorElForManufacturing(null);
    setAnchorEl(null);
  };

  const handleDistributorClose = () => {
    setDistributorAnchorEl(null);
  };
  // const underlineText = (text) => {
  //   setText(text)
  // }

  return (
    <>
      <header className="flex justify-between items-center h-30 px-20 py-2 bg-gradient-to-r from-[#86d3e3] to-[#506bf2]">
        <div>
          <Link to="/" className="no-underline">
            <img
              src="/Posetra_Logo1.jpg"
              alt="Website Logo"
              className="h-20 rounded-full"
            />
          </Link>
        </div>
        {isLoggedIn && (
          <nav>
            <ul className="flex gap-4 font-semibold">
              {/* Your existing navigation items */}

              {userRole != 'user' && (
                <>
                  <li className="">
                    <Link
                      // to="/products"
                      className="text-0.9xl text-whiteColor border-solid hover:border-b-4 pb-1"
                      onClick={handleAccounting}
                    >
                      Accounting
                    </Link>
                  </li>
                  <Popper
                    open={Boolean(anchorElForAccounting)}
                    anchorEl={anchorElForAccounting}
                    placement="bottom-start"
                    disablePortal={false}
                    modifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 10],
                        },
                      },
                    ]}
                    sx={{
                      zIndex: 10000,
                    }}
                  >
                    <ClickAwayListener
                      onClickAway={handleAccountingPopperClose}
                    >
                      <Paper>
                        <MenuList
                          autoFocusItem={Boolean(anchorElForAccounting)}
                          id="menu-list-grow"
                        >
                          {AccountingData.map(({ title, path }) => {
                            return (
                              <MenuItem
                                className="text-blue-500"
                                onClick={() =>
                                  handleAccountingPopperClose(path)
                                }
                              >
                                {title}
                              </MenuItem>
                            );
                          })}
                        </MenuList>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                  <li className="">
                    <Link
                      // to="/products"
                      className="text-whiteColor cursor-pointer"
                      onClick={handleManufacturing}
                    >
                      Manufacturing
                    </Link>
                  </li>
                  <li
                    className="text-whiteColor cursor-pointer"
                    onClick={handleSouricng}
                  >
                    Sourcing
                  </li>
                  <Popper
                    open={Boolean(anchorElForSourcing)}
                    anchorEl={anchorElForSourcing}
                    placement="bottom-start"
                    disablePortal={false}
                    modifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 10],
                        },
                      },
                    ]}
                    sx={{
                      zIndex: 10000,
                    }}
                  >
                    <ClickAwayListener onClickAway={handleSourcingPopperClose}>
                      <Paper>
                        <MenuList
                          autoFocusItem={Boolean(anchorElForSourcing)}
                          id="menu-list-grow"
                        >
                          {SourcingData.map(({ title, path }) => {
                            return (
                              <MenuItem
                                className="text-blue-500"
                                onClick={() => handleSourcingPopperClose(path)}
                              >
                                {title}
                              </MenuItem>
                            );
                          })}
                        </MenuList>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                  <Popper
                    open={Boolean(anchorElForManufacturing)}
                    anchorEl={anchorElForManufacturing}
                    placement="bottom-start"
                    disablePortal={false}
                    modifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 10],
                        },
                      },
                    ]}
                    sx={{
                      zIndex: 10000,
                    }}
                  >
                    <ClickAwayListener
                      onClickAway={handleManufacturingPopperClose}
                    >
                      <Paper>
                        <MenuList
                          autoFocusItem={Boolean(anchorElForManufacturing)}
                          id="menu-list-grow"
                        >
                          {ManufacturingData.map(({ title, path }) => {
                            return (
                              <MenuItem
                                className="text-blue-500"
                                onClick={() =>
                                  handleManufacturingPopperClose(path)
                                }
                              >
                                {title}
                              </MenuItem>
                            );
                          })}
                        </MenuList>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                  <li className="">
                    <Link
                      to="/products"
                      className="text-0.9xl text-whiteColor border-solid hover:border-b-4 pb-1"
                    >
                      Product Categories
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/solutions"
                      className="text-0.9xl text-whiteColor border-solid hover:border-b-4 pb-1"
                    >
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pricing"
                      className="text-0.9xl text-whiteColor border-solid hover:border-b-4 pb-1"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/inventory"
                      className="text-0.9xl text-whiteColor border-solid hover:border-b-4 pb-1"
                    >
                      Inventory
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/quotation"
                      className="text-0.9xl text-whiteColor border-solid hover:border-b-4 pb-1"
                    >
                      Quotation
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/order"
                      className="text-0.9xl text-whiteColor border-solid hover:border-b-4 pb-1"
                    >
                      Order
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/ship"
                      className="text-0.9xl text-whiteColor border-solid hover:border-b-4 pb-1"
                    >
                      Ship
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/invoice"
                      className="text-0.9xl text-whiteColor border-solid hover:border-b-4 pb-1"
                    >
                      Invoice
                    </Link>
                  </li>
                </>
              )}
              {userRole === 'user' && (
                <li className="">
                  <Link
                    to="/distributors/products"
                    className="text-0.9xl text-whiteColor border-solid hover:border-b-4 pb-1"
                  >
                    Products
                  </Link>
                </li>
              )}

              {/* Add Distributor Icon and Dropdown if user is a distributor */}
              {userRole === 'distributor' && (
                <li className="relative">
                  <LocalShippingIcon
                    style={{
                      marginTop: '5px',
                      height: '30px',
                      width: '30px',
                      cursor: 'pointer',
                      color: 'white',
                    }}
                    onClick={handleDistributorClick}
                  />
                  <Popper
                    open={Boolean(distributorAnchorEl)}
                    anchorEl={distributorAnchorEl}
                    placement="bottom-start"
                    modifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 10],
                        },
                      },
                    ]}
                  >
                    <ClickAwayListener onClickAway={handleDistributorClose}>
                      <Paper className="mt-2">
                        <MenuList>
                          {distributorRoutes.map((route, index) => (
                            <MenuItem
                              key={index}
                              onClick={handleDistributorClose}
                              className="hover:bg-gray-100"
                            >
                              <Link
                                to={route.path}
                                className="font-bold text-blue-600 no-underline w-full"
                              >
                                {route.title}
                              </Link>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>
                </li>
              )}

              {/* Shopping Cart */}
              <li className="relative text-black border-solid hover:border-blue-600">
                <Link to="/cart">
                  <ShoppingCartIcon
                    style={{
                      marginTop: '5px',
                      height: '30px',
                      width: '30px',
                      color: 'white',
                    }}
                  />
                  {totalItemsInCart > 0 && (
                    <span style={{ color: 'white' }}>{totalItemsInCart}</span>
                  )}
                </Link>
              </li>

              {/* Profile Icon */}
              <li
                className="relative flex items-center justify-center cursor-pointer"
                onClick={handleProfileClick}
              >
                <AccountCircleIcon
                  style={{
                    marginTop: '5px',
                    height: '30px',
                    width: '30px',
                    cursor: 'pointer',
                    color: 'white',
                  }}
                />
                <div
                  className="text-whiteColor"
                  style={{
                    marginLeft: '10px',
                  }}
                >
                  {user?.name}
                </div>

                <Popper
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  placement="bottom-start"
                  modifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 10],
                      },
                    },
                  ]}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <Paper>
                      <MenuList
                        autoFocusItem={Boolean(anchorEl)}
                        id="menu-list-grow"
                      >
                        {DashboardsData.map((option, index) => {
                          if (
                            option === 'Settings' &&
                            userRole === 'distributor'
                          ) {
                            return (
                              <MenuItem
                                onClick={handleClose}
                                className="text-blue-500"
                              >
                                <Link
                                  className="font-bold text-red-500 text-0.3xl cursor-pointer"
                                  to={`/settings`}
                                >
                                  {option}
                                </Link>
                              </MenuItem>
                            );
                          }
                          return (
                            <MenuItem
                              key={index}
                              onClick={handleClose}
                              className="text-blue-500"
                            >
                              {option !== 'Shipped Orders' && (
                                <Link
                                  className="font-bold text-red-500 text-0.3xl cursor-pointer"
                                  to={`/${option
                                    .replace(' ', '-')
                                    .toLowerCase()}`}
                                >
                                  {/* {console.log(option)} */}
                                  {option}
                                </Link>
                              )}
                              {option === 'Shipped Orders' && (
                                <Link
                                  className="font-bold text-red-500 text-0.3xl cursor-pointer"
                                  to="/trackShipping"
                                >
                                  {/* {console.log(option)} */}
                                  {option}
                                </Link>
                              )}
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Paper>
                  </ClickAwayListener>
                </Popper>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;

//   return (
//     <>
//       <header className="container flex justify-between items-center h-30 px-20 py-2 bg-gradient-to-r from-[#86d3e3] to-[#506bf2]">
//         <div>
//           <Link to="/" className="no-underline">
//             <img
//               src="/Posetra_Logo1.jpg"
//               alt="Website Logo"
//               className="h-20 rounded-full"
//             />
//           </Link>
//         </div>
//         {isLoggedIn && (
//           <nav>
//             <ul className="flex gap-4 font-semibold">
// <li className="">
//   <Link
//     to="/products"
//     className="text-xl text-whiteColor border-solid hover:border-b-4 pb-1"
//   >
//     Products
//   </Link>
// </li>
// <li>
//   <Link
//     to="/solutions"
//     className="text-xl text-whiteColor border-solid hover:border-b-4 pb-1"
//   >
//     Solutions
//   </Link>
// </li>
// <li>
//   <Link
//     to="/pricing"
//     className="text-xl text-whiteColor border-solid hover:border-b-4 pb-1"
//   >
//     Pricing
//   </Link>
// </li>
// <li>
//   <Link
//     to="/inventory"
//     className="text-xl text-whiteColor border-solid hover:border-b-4 pb-1"
//   >
//     Inventory
//   </Link>
// </li>
// <li>
//   <Link
//     to="/quotation"
//     className="text-xl text-whiteColor border-solid hover:border-b-4 pb-1"
//   >
//     Quotation
//   </Link>
// </li>
// <li>
//   <Link
//     to="/order"
//     className="text-xl text-whiteColor border-solid hover:border-b-4 pb-1"
//   >
//     Order
//   </Link>
// </li>
// <li>
//   <Link
//     to="/ship"
//     className="text-xl text-whiteColor border-solid hover:border-b-4 pb-1"
//   >
//     Ship
//   </Link>
// </li>
// <li>
//   <Link
//     to="/invoice"
//     className="text-xl text-whiteColor border-solid hover:border-b-4 pb-1"
//   >
//     Invoice
//   </Link>
// </li>
// <li className="relative text-black  border-solid hover:border-blue-600">
//   <Link to="/cart">
//     <ShoppingCartIcon
//       style={{
//         marginTop: '5px',
//         height: '30px',
//         width: '30px',
//         color: 'white',
//       }}
//     />
//     {totalItemsInCart > 0 && (
//       <span style={{ color: 'white' }}>{totalItemsInCart}</span>
//     )}
//   </Link>
// </li>
// {/* Profile Icon with Popper */}
// <li className="relative">
//   <AccountCircleIcon
//     style={{
//       marginTop: '5px',
//       height: '30px',
//       width: '30px',
//       cursor: 'pointer',
//       color: 'white',
//     }}
//     color="white"
//     onClick={handleProfileClick}
//   />
//   <Popper
//     open={Boolean(anchorEl)}
//     anchorEl={anchorEl}
//     placement="bottom-start"
//     modifiers={[
//       {
//         name: 'offset',
//         options: {
//           offset: [0, 10], // Adjust the second value for vertical offset (10px margin)
//         },
//       },
//     ]}
//   >
//     {({ TransitionProps }) => (
//       <ClickAwayListener onClickAway={handleClose}>
//         <Paper>
//           <MenuList
//             autoFocusItem={Boolean(anchorEl)}
//             id="menu-list-grow"
//           >
//             {DashboardsData.map((option, index) => (
//               <MenuItem
//                 key={index}
//                 onClick={handleClose}
//                 className="text-blue-500"
//               >
//                 <Link
//                   className="font-bold text-red-500 text-0.3xl cursor-pointer"
//                   to={`/${option
//                     .replace(' ', '-')
//                     .toLowerCase()}`}
//                 >
//                   {option}
//                 </Link>
//               </MenuItem>
//             ))}
//           </MenuList>
//         </Paper>
//       </ClickAwayListener>
//     )}
//   </Popper>
// </li>
// </ul>
//           </nav>
//         )}
//       </header>
//     </>
//   );
// };

// export default Header;
