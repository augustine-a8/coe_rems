import {
  faChevronLeft,
  faClose,
  faFileExport,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@apollo/client";

import "./home.style.css";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { GET_ALL_SIGNATURES } from "../../api";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/error";
import { useEffect, useState } from "react";
import { useAppState } from "../../hooks";
import Dropdown from "../../components/dropdown/Dropdown";
import { setAllSignatures } from "../../redux/appSlice";
import rooms from "../../constants/rooms.json";

type UserCategory =
  | "default"
  | "sm"
  | "nsm/attd"
  | "nsm/nss-teo"
  | "nsm/nss-ta";

type RoomsAndCenters = {
  NEB: string[];
  PB: string[];
  BK: string[];
  EO: string[];
};

type Session = "default" | "1" | "2" | " 3" | "4" | "5" | "6" | "7";

const userCategoryOptions = ["sm", "nsm/attd", "nsm/nss-teo", "nsm/nss-ta"];

const sessionOptions = ["1", "2", "3", "4", "5", "6", "7"];

const roomsAndCenters: RoomsAndCenters = rooms;

function getCenterForRoom(
  room: string,
  rooms: RoomsAndCenters = roomsAndCenters
) {
  const parsedRooms = Object.entries(rooms);
  let chosenCenter = "";
  for (const center of parsedRooms) {
    if (center[1].includes(room)) {
      chosenCenter = center[0];
    }
  }
  return chosenCenter;
}

export default function Home() {
  const { data, loading, error } = useQuery(GET_ALL_SIGNATURES);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedUserCategory, setSelectedUserCategory] =
    useState<UserCategory>("default");
  const [selectedSession, setSelectedSession] = useState<Session>("default");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedCenter, setSelectedCenter] = useState<
    "NEB" | "PB" | "BK" | "EO" | ""
  >("");
  const { appDispatch, state } = useAppState();

  const { signatures } = state;

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  useEffect(() => {
    if (data && !loading && !error) {
      setAllSignatures(data.getSignatures);
      appDispatch({
        type: "load_signatures",
        payload: { signatures: data.getSignatures },
      });
    }
  }, [data]);

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (error) {
    return <Error errorMessage={error.message} />;
  }

  let filteredSignatures = signatures.filter((signature) =>
    signature.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedUserCategory !== "default") {
    filteredSignatures = filteredSignatures.filter(
      (signature) =>
        signature.user.category.toLowerCase() === selectedUserCategory
    );
  }

  if (selectedCenter !== "") {
    filteredSignatures = filteredSignatures.filter((signature) => {
      const center = getCenterForRoom(signature.room.name);
      if (center === selectedCenter) {
        return true;
      }
    });
  }

  if (selectedSession !== "default") {
    filteredSignatures = filteredSignatures.filter(
      (signature) => signature.session.toString() === selectedSession
    );
  }

  const resetFilter = () => {
    setSelectedSession("default");
    setSelectedCenter("");
    setSelectedUserCategory("default");
    setShowFilter((prev) => !prev);
  };

  const itemsPerPage = 50;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredSignatures.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(signatures.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <>
      <div className="signature-header">
        <div className="search-box-group">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for invigilator"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
            <div className="icon-container">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
          <a href="#" className="search-filter" onClick={toggleFilter}>
            <FontAwesomeIcon icon={faFilter} />
          </a>
          {showFilter && (
            <div className="filter-box">
              <div className="filter-header">
                <FontAwesomeIcon icon={faClose} onClick={toggleFilter}/>
              </div>
              <label htmlFor="">User Category</label>
              <Dropdown
                onSelect={(option) => {
                  setSelectedUserCategory(option as UserCategory);
                }}
                value={selectedUserCategory}
                options={userCategoryOptions}
                label="User Category"
              />
              <label htmlFor="">Session</label>
              <Dropdown
                onSelect={(option) => {
                  setSelectedSession(option as Session);
                }}
                value={selectedSession}
                options={sessionOptions}
                label="Session"
              />

              <label htmlFor="">Date</label>
              <div className="filter-date">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="#">Center</label>
                <div className="center__grid">
                  <div>
                    <input
                      type="radio"
                      name="center"
                      id="bk"
                      onChange={() => {
                        setSelectedCenter("BK");
                      }}
                    />
                    <label htmlFor="bk">BK</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="center"
                      id="pb"
                      onChange={() => {
                        setSelectedCenter("PB");
                      }}
                    />
                    <label htmlFor="pb">PB</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="center"
                      id="neb"
                      onChange={() => {
                        setSelectedCenter("NEB");
                      }}
                    />
                    <label htmlFor="neb">NEB</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="center"
                      id="eo"
                      onChange={() => {
                        setSelectedCenter("EO");
                      }}
                    />
                    <label htmlFor="eo">EO</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="center"
                      id="none"
                      defaultChecked
                      onChange={() => {
                        setSelectedCenter("");
                      }}
                    />
                    <label htmlFor="none">None</label>
                  </div>
                </div>
              </div>
              <button className="filter-btn" onClick={resetFilter}>
                Reset
              </button>
            </div>
          )}
        </div>
        <div>
          <a href="#" className="export-btn">
            <FontAwesomeIcon icon={faFileExport} />
            <p>Export Pdf</p>
          </a>
        </div>
      </div>
      <div className="signature-body">
        <div className="signature-table-control">
          {/* <div className="signature-table-icon-group">
            <div>
              <input type="checkbox" name="select-all" id="select-all" />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                size="sm"
                color="#5f5f5f"
              />
            </div>
          </div> */}
          <div className="signature-table-pagination">
            <div>
              <p>
                {indexOfFirstItem + 1} - {indexOfLastItem} of{" "}
                {filteredSignatures.length}
              </p>
            </div>
            <button onClick={prevPage}>
              <FontAwesomeIcon icon={faChevronLeft} size="xs" color="#5f5f5f" />
            </button>
            <button onClick={nextPage}>
              <FontAwesomeIcon
                icon={faChevronRight}
                size="xs"
                color="#5f5f5f"
              />
            </button>
          </div>
        </div>
        <table className="signature-table">
          <thead>
            <tr>
              {/* <th></th> */}
              <th>Name</th>
              <th>User Category</th>
              <th>Room</th>
              <th>Session</th>
              <th>Date</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody className="signature-table-body">
            {currentItems.map((signature) => (
              <tr key={signature._id}>
                {/* <td>
                  <input type="checkbox" name="" id="" />
                </td> */}
                <td>{signature.user.name}</td>
                <td>{signature.user.category}</td>
                <td>{signature.room.name}</td>
                <td>{signature.session}</td>
                <td>{new Date(signature.signedAt).toDateString()}</td>
                <td>{signature.duration / 60}hrs</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
