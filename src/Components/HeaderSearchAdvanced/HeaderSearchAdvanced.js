import React, { useEffect, useState } from "react";
// import "./HeaderSearchAdvanced.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import api from "../../API/ApiLink.js";
import Cookies from 'js-cookie';

import { Navbar, Nav, Container, NavDropdown, Col, ToggleButton } from 'react-bootstrap';
import Search from "../Search/Search";
export default function HeaderSearchAdvanced() {
  const token = Cookies.get("token")
  const [searchText, setSearchText] = useState([])
  const [selectedOption, setSelectedOption] = useState("sale");
  const [subCategory, setSubCategory] = useState("");
  const [propertyType, setPropertyType] = useState("سكنى");
  const [showDropdown, setShowDropdown] = useState(false);

  // const [showDropdownArea, setShowDropdownArea] = useState(false);
  // const [showDropdownPrice, setShowDropdownPrice] = useState(false);
  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] =
    useState(false);

  const residentialOptions = [
    "شقة", "فيلا", "دوبلكس", "بنتهاوس", "شاليه", "تاون هاوس", "توين هاوس", "أرض سكنيه"
  ];

  const commercialOptions = [
    "زراعى", "صناعى", "محلات تجارية"
  ];

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === "rent") {
      setShowDropdown(true);
    }
  };

  const handleSubCategoryChange = (duration) => {
    setSubCategory(duration);
  };

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
  };

  const handleReset = () => {
    setSelectedOption("sale");
    setSubCategory("");
    setPropertyType("سكنى");
    setShowDropdown(false);
    setShowPropertyTypeDropdown(false);
    setPrice({ min: "", max: "" });
    setArea({ min: "", max: "" });
  };

  const handleDone = () => {
    setShowDropdown(false);
    setShowPropertyTypeDropdown(false);
  };

  const [selectedRooms, setSelectedRooms] = useState([]);
  const [selectedBathRooms, setSelectedBathRooms] = useState([]);
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);


  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [price, setPrice] = useState({ min: "", max: "" });
  const [area, setArea] = useState({ min: "", max: "" });




  const [rooms, setRooms] = useState([]);
  const [bathrooms, setBathrooms] = useState([]);

  const roomValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  const bathroomValues = ["1", "2", "3", "4", "5", "6"];

  const handleRoomChange = (room) => {
    setRooms((prevRooms) =>
      prevRooms.includes(room)
        ? prevRooms.filter((item) => item !== room)
        : [...prevRooms, room]
    );
  };

  const handleBathRoomChange = (bathroom) => {
    setBathrooms((prevBathrooms) =>
      prevBathrooms.includes(bathroom)
        ? prevBathrooms.filter((item) => item !== bathroom)
        : [...prevBathrooms, bathroom]
    );
  };

  const resetSelections = () => {
    setRooms([]);
    setBathrooms([]);
  };


  const getDropdownTitle = () => {
    const roomsTitle = ` الغرف: ${selectedRooms.join(", ")}`;
    const bathroomsTitle = ` الحمامات: ${selectedBathRooms.join(", ")}`;
    return `${roomsTitle} | ${bathroomsTitle}`;


  };

  const [showDropdownSpeed, setShowDropdownSpeed] = useState(false);
  const [selectedTime, setSelectedTime] = useState("30 دقيقة");

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };
  const resetSelection = () => {
    setSelectedTime("30 دقيقة");
  };


  const [doSearch, setDoSearch] = useState(true)

  const [radioValue, setRadioValue] = useState('الجميع');

  const radios = [
    { name: 'قيد الانشاء', value: 'قيد الانشاء' },
    { name: 'جاهز', value: 'جاهز' },
    { name: 'الجميع', value: 'الجميع' },
  ];
  // ظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظظ
  const [address, setAddress] = useState({
    governorate: [],
    city: [],
    street: [],
    region: []
  });
  useEffect(() => {
    const groupedAddress = searchText.reduce((acc, item) => {
      acc[item.type] = acc[item.type] || [];
      acc[item.type].push(item.name);
      return acc;
    }, {});
    setAddress(groupedAddress);

    console.log("///////////")
    console.log(address);//سيتم ارسال المحافظه و المدينه و المنطقه و الشارع فى هذا المتغير
    console.log(selectedOption)// هبعت هنا ال type  عشان احدد بيع وله ايجار
    console.log(subCategory)// هنا هبعت نوع الحاجه اللى هيبحث عنها فى ال sub_category
    console.log(rooms)// هبعت عدد الغرف اللى اختارها فى  rooms
    console.log(bathrooms)// هبعت عدد الحمامات فى  bathrooms
    console.log(area)//سيتم ارشال area  من حيث  max_area min_area
    console.log(price)//سيتم ارسال price  من حيث min_price max_price
    console.log("___________")
    setDoSearch(!doSearch)
  }, [searchText, selectedOption, subCategory, rooms, bathrooms, area, price]);

  // API
  useEffect(() => {
    const handelSearch = async (e) => {
      try {
        const params = {
          governorate: address.governorate,
          city: address.city,
          street: address.street,
          region: address.region,
          type: selectedOption,
          sub_category: subCategory,
          rooms: rooms,
          bathrooms: bathrooms,
          max_price: price.max,
          min_price: price.min,
          max_area: area.max,
          min_area: area.min,
        };
        console.log(params)
        const response = await api.get("/searchAds", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: params,
        });
        console.log(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    handelSearch()
  }, [doSearch])

  return (
    <>
      <Container >
        <Navbar expand="lg">
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between show" style={{ paddingRight: "20px" }}>
            <Form dir="rtl" className="w-100">
              <Row className="mb-3 d-flex align-items-center justify-content-start formInfoAdvanced">
                <Col lg="1" md="2" className="mb-2" >
                  <Form.Group className="inputSelectAdvanced">
                    <Dropdown
                      show={showDropdown}
                      onToggle={(isOpen) => setShowDropdown(isOpen)}
                      align="end"
                    >
                      <Button
                        variant="light"
                        id="dropdown-basic"
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-100"
                      >
                        {selectedOption === "sale" ? "للبيع" : "للايجار"}
                      </Button>

                      <Dropdown.Menu
                        className="dropdown-menu-right menu-sale"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-3">
                          <h5 className="mb-3 type-ofer">نوع العرض</h5>
                          <div className="d-flex justify-content-around">
                            <Button
                              className="btn btn-primary select-option"
                              onClick={(e) => {
                                e.preventDefault();
                                handleOptionChange("sale");
                              }}
                              active={selectedOption === "sale"}
                            >
                              للبيع
                            </Button>
                            <Button
                              className="btn btn-primary select-option"
                              onClick={(e) => {
                                e.preventDefault();
                                handleOptionChange("rent");
                              }}
                              active={selectedOption === "rent"}
                            >
                              للايجار
                            </Button>
                          </div>
                          <hr />
                          <div className="d-flex justify-content-between mt-3">
                            <Button variant="secondary" onClick={handleReset}>
                              إعادة ضبط
                            </Button>
                            <Button
                              className="me-2"
                              variant="primary"
                              onClick={handleDone}
                            >
                              تم
                            </Button>
                          </div>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                </Col>

                <Col lg="4" md="6" className="mb-2" >
                  <Search className="search" setSearchText={setSearchText} />
                </Col>

                <Col lg="1" md="2" className="mb-2" >
                  <Form.Group className="inputSelectAdvanced">
                    <Dropdown
                      show={showPropertyTypeDropdown}
                      onToggle={(isOpen) => setShowPropertyTypeDropdown(isOpen)}
                      align="end"
                    >
                      <Button
                        variant="light"
                        id="dropdown-basic"
                        onClick={() =>
                          setShowPropertyTypeDropdown(!showPropertyTypeDropdown)
                        }
                        className="w-100"
                      >
                        {propertyType}
                      </Button>

                      <Dropdown.Menu
                        className="menu-sale"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="p-3">
                          <div className="d-flex justify-content-around">
                            <Button
                              className="btn btn-primary select-option"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePropertyTypeChange("سكنى");
                              }}
                              active={propertyType === "سكنى"}
                            >
                              سكنى
                            </Button>
                            <Button
                              className="btn btn-primary select-option"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePropertyTypeChange("تجارى");
                              }}
                              active={propertyType === "تجارى"}
                            >
                              تجارى
                            </Button>
                          </div>

                          {propertyType === "سكنى" && (
                            <div className="menu-option">
                              <h5 className="mt-3 mb-3">خيارات السكنى</h5>
                              {residentialOptions.map((option) => (
                                <Dropdown.Item
                                  key={option}
                                  onClick={() => handleSubCategoryChange(option)}
                                  active={subCategory === option}
                                >
                                  {option}
                                </Dropdown.Item>
                              ))}
                            </div>
                          )}

                          {propertyType === "تجارى" && (
                            <div className="menu-option">
                              <h5 className="mt-3 mb-3">خيارات التجارى</h5>
                              {commercialOptions.map((option) => (
                                <Dropdown.Item
                                  key={option}
                                  onClick={() => handleSubCategoryChange(option)}
                                  active={subCategory === option}
                                >
                                  {option}
                                </Dropdown.Item>
                              ))}
                            </div>
                          )}

                          <div className="d-flex justify-content-between mt-3">
                            <Button variant="secondary" onClick={handleReset}>
                              إعادة ضبط
                            </Button>
                            <Button
                              className="me-2"
                              variant="primary"
                              onClick={handleDone}
                            >
                              تم
                            </Button>
                          </div>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                </Col>

                <Col lg="2" md="3" className="mb-2" >
                  <Form.Group className="inputSelectAdvanced">
                    <Dropdown
                      show={showRoomsDropdown}
                      onToggle={(isOpen) => setShowRoomsDropdown(isOpen)}
                    >
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={getDropdownTitle()}
                        onClick={() => setShowRoomsDropdown(!showRoomsDropdown)}
                        variant="light"
                      >
                        <div className="p-3 numRoomsAndBath">
                          <h5>عدد الغرف</h5>
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            {roomValues.map((room, idx) => (
                              <div key={idx} className="me-2 roomAndBath">
                                <Form.Check
                                  type="checkbox"
                                  label={room === "0" ? "استوديو" : room === "8" ? `+${room}` : room}
                                  checked={rooms.includes(room)}
                                  onChange={() => handleRoomChange(room)}
                                />
                              </div>
                            ))}
                          </div>
                          <h5>عدد الحمامات</h5>
                          <div className="d-flex align-items-center justify-content-start">
                            {bathroomValues.map((bathroom, idx) => (
                              <div key={idx} className="me-2 roomAndBath">
                                <Form.Check
                                  type="checkbox"
                                  label={bathroom === "6" ? `+${bathroom}` : bathroom}
                                  checked={bathrooms.includes(bathroom)}
                                  onChange={() => handleBathRoomChange(bathroom)}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="d-flex justify-content-end mt-3">
                            <Button variant="primary" onClick={resetSelections}>
                              إعادة ضبط
                            </Button>
                          </div>
                        </div>
                      </DropdownButton>
                    </Dropdown>
                  </Form.Group>
                </Col>

                <Col lg="1" md="3" className="mb-2" >
                  <Form.Group className="inputSelectAdvanced">
                    <Dropdown
                      show={showPriceDropdown}
                      onToggle={(isOpen) => setShowPriceDropdown(isOpen)}
                    >
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="بحث متقدم"
                        onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                        variant="light"
                        style={{ width: "300px" }}
                      >
                        <div className="p-3 menuValue w-200 style-menu-h5">
                          <h5>السعر ( ج.م )</h5>
                          <div className="d-flex align-items-center justify-content-between">
                            <Form.Group className="minAndMaxValue ms-3">
                              <Form.Label className="heading-value">الحد الأدنى</Form.Label>
                              <Form.Select
                                value={price.min}
                                onChange={(e) => setPrice({ ...price, min: e.target.value })}
                              >
                                <option>100</option>
                                <option>200</option>
                                <option>300</option>
                                <option>400</option>
                                <option>500</option>
                              </Form.Select>
                            </Form.Group>
                            <Form.Group className="minAndMaxValue me-3">
                              <Form.Label className="heading-value">الحد الأعلى</Form.Label>
                              <Form.Select
                                value={price.max}
                                onChange={(e) => setPrice({ ...price, max: e.target.value })}
                              >
                                <option>1000</option>
                                <option>2000</option>
                                <option>2000</option>
                                <option>50000</option>
                                <option>100000</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                          <h5>المساحة ( متر مربع )</h5>
                          <div className="d-flex align-items-center justify-content-between">
                            <Form.Group className="minAndMaxValue ms-3">
                              <Form.Label className="heading-value">أقل مساحة</Form.Label>
                              <Form.Select
                                value={area.min}
                                onChange={(e) => setArea({ ...area, min: e.target.value })}
                              >
                                <option>100</option>
                                <option>200</option>
                                <option>300</option>
                                <option>400</option>
                                <option>500</option>
                              </Form.Select>
                            </Form.Group>
                            <Form.Group className="minAndMaxValue me-3">
                              <Form.Label className="heading-value">أكبر مساحة</Form.Label>
                              <Form.Select
                                value={area.max}
                                onChange={(e) => setArea({ ...area, max: e.target.value })}
                              >
                                <option>1000</option>
                                <option>2000</option>
                                <option>3000</option>
                                <option>4000</option>
                                <option>5000</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <Button variant="secondary" onClick={handleReset}>
                              إعادة الضبط
                            </Button>
                          </div>
                        </div>
                      </DropdownButton>
                    </Dropdown>
                  </Form.Group>
                </Col>

                <Col lg="4" md="6" className="mb-2" >
                  <Form.Group className="inputLocationAdvanced">
                    <ButtonGroup className="d-flex justify-content-between groub-btns" dir="ltr">
                      {radios.map((radio, idx) => (
                        <ToggleButton
                          key={idx}
                          id={`radio-${idx}`}
                          type="radio"
                          variant='outline-primary'
                          name="radio"
                          style={{ marginLeft: "5px" }}
                          value={radio.value}
                          checked={radioValue === radio.value}
                          onChange={(e) => setRadioValue(e.currentTarget.value)}
                        >
                          {radio.name}
                        </ToggleButton>
                      ))}
                    </ButtonGroup>




                  </Form.Group>
                </Col>

              </Row>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
}
