import "../../styles/Jisu/rentalSearch.css";
import { useLocation } from "react-router-dom";
import Footer from "../../components/common/Footer";
import Navbar_Perforemr from "../../components/common/Navbar_Performer";
import RentalSearchBar_2 from "../../components/rental/RentalSearchBar_2.jsx";
import RentalSearchFilter from "../../components/rental/RentalSearchFilter.jsx";
import HotConcertHall from "../../components/_test_/Booking/HotConcertHall.jsx";
import SearchMap from "../../components/rental/SearchMap.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";

// 검색 결과창
const RentalSearch = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const hallsPerPage = 12; // 한 페이지에 표시할 콘서트홀 개수
  const [concertHalls, setConcertHalls] = useState([]); // 콘서트홀 데이터 저장할 상태

  const searchValues = location.state || {};
  console.log("전달된 검색 조건 :", searchValues);

  useEffect(() => {
    const baseUrl = "http://ec2-3-34-248-63.ap-northeast-2.compute.amazonaws.com:8081/spaces/search";
    
    const fetchConcertHalls = async () => {
      try {
        const response = await axios.get(baseUrl, {
          params: {
            name: searchValues.searchName || "",
            city: searchValues.selectedLocation?.Do || "",
            district: searchValues.selectedLocation?.District || "",
            date: searchValues.selectedDate || "",
            type: searchValues.mappedType || "",
          },
        });

        setConcertHalls(response.data.result.spaceList || []);
        console.log("[검색] 검색된 결과: ", response.data.result.spaceList);
      } catch (error) {
        console.error("[검색] API 호출 오류:", error);
      }
    };

    fetchConcertHalls();
  }, [searchValues]);

  const totalPages = Math.ceil(concertHalls.length / hallsPerPage);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const indexOfLastHall = currentPage * hallsPerPage;
  const indexOfFirstHall = indexOfLastHall - hallsPerPage;
  const currentHalls = concertHalls.slice(indexOfFirstHall, indexOfLastHall);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="RentalSearch">
      <Navbar_Perforemr />
      <Footer />
      <div className="RentalSearchContent">
        <div className="BarAndFilter">
          <RentalSearchBar_2 />
          <RentalSearchFilter />
        </div>

        <div className="ConcertHallAndMap">
          <div
            className="ConcertHallAndMapBody"
            style={{ display: isCollapsed ? "none" : "block" }}
          >
            <div className="FindText">
              검색된 콘서트홀 {concertHalls.length}개 발견
            </div>
            <div className="ConcertHalls">
              {currentHalls.map((hall) => (
                <HotConcertHall className="ConcertHallCss" key={hall.spaceId} hall={hall} />
              ))}
            </div>
            <div className="Pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={i + 1 === currentPage ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="Map" style={{ width: isCollapsed ? "100%" : "50%" }}>
            <SearchMap />
          </div>
        </div>

        {/* 버튼에 collapsed 클래스 추가 */}
        <button  
          onClick={toggleCollapse} 
          className={`toggleButton ${isCollapsed ? "collapsed" : ""}`}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>
    </div>
  );
};

export default RentalSearch;
