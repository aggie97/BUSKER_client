import MainListUI from "./List.presenter";
import { Modal, SelectProps } from "antd";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  IQuery,
  IQueryFetchBoardsBySearchArgs,
} from "../../../../commons/types/generated/types";
import { FETCH_BOARDS_BY_SEARCH } from "./List.queries";
import DistrcitData from "./DistrictData";
import { useState } from "react";
import { FETCH_ARTIST } from "../../detail/ArtDetail.queries";
import { FETCH_USER } from "../../myPage/detail/MyPageDetail.queries";

const MainList = () => {
  const router = useRouter();
  const locationOptions = [...DistrcitData];
  const {
    data: boardsData,
    refetch,
    fetchMore,
  } = useQuery<
    Pick<IQuery, "fetchBoardsBySearch">,
    IQueryFetchBoardsBySearchArgs
  >(FETCH_BOARDS_BY_SEARCH);

  const { data: isArtist } =
    useQuery<Pick<IQuery, "fetchArtist">>(FETCH_ARTIST);
  const { data: isUser } = useQuery<Pick<IQuery, "fetchUser">>(FETCH_USER);
  const genreOptions: SelectProps["options"] = [
    {
      value: "55e17492-ff90-4dc7-b765-93e032a27e3c",
      label: "노래",
    },
    {
      value: "94d9ea62-8b17-4498-85b8-93675e65020d",
      label: "랩",
    },
    {
      value: "87bf8af2-b764-4c3e-91a2-94583b858dca",
      label: "마술",
    },
    {
      value: "80350a1c-acef-4fd1-a989-a0aa24dfae2c",
      label: "악기",
    },
    {
      value: "d3f6c47f-9041-4618-b9a9-5f6d78f58629",
      label: "춤",
    },
  ];

  const [selectedGenre, setSelectedGenre] = useState<string[] | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const handleChangeGenre = async (value: string[]) => {
    setSelectedGenre(value);
    if (value.length) {
      await refetch({
        searchBoardInput: { category: value, district: selectedDistrict },
      });
    } else {
      await refetch({
        searchBoardInput: { page: 1, district: selectedDistrict },
      });
      setSelectedGenre(null);
    }
  };

  const handleChangeLocation = async (value: string[]) => {
    const district = `${value?.[0]} ${value?.[1]}`;
    setSelectedDistrict(district);

    if (district === "undefined undefined") {
      await refetch({ searchBoardInput: { page: 1, category: selectedGenre } });
      setSelectedDistrict(null);
    } else {
      await refetch({
        searchBoardInput: { district, category: selectedGenre },
      });
    }
  };

  const onClickListItem = (id: string) => async () => {
    await router.push(`/main/list/${id}`);
  };

  const onClickToMap = async () => {
    await router.push("/map");
  };

  const onClickMoveToArtRegister = async () => {
    if (isArtist) {
      await router.push("/artregister");
    } else if (isUser) {
      Modal.confirm({
        content: (
          <div style={{ width: "100%", textAlign: "center" }}>
            <span style={{ textAlign: "center" }}>
              버스커로 등록 후 이용 가능합니다.
            </span>
            <br />
            <span style={{ textAlign: "center" }}>
              버스커로 등록하시겠습니까?
            </span>
          </div>
        ),
        onOk: () => {
          router.push("/artistsignup");
        },
      });
    } else {
      Modal.warning({
        bodyStyle: { fontSize: "1.5rem" },
        content: "로그인 후에 이용하실 수 있습니다.",
      });
      await router.push("/login");
    }
  };

  const loadMore = async () => {
    if (boardsData === undefined) return;
    try {
      await fetchMore({
        variables: {
          searchBoardInput: {
            page: Math.ceil(boardsData.fetchBoardsBySearch.length / 12) + 1,
            district: selectedDistrict,
            category: selectedGenre,
          },
        },
        updateQuery: (prev, options) => {
          console.log(prev, options);
          if (options.fetchMoreResult.fetchBoardsBySearch === undefined) {
            return { fetchBoardsBySearch: [...prev.fetchBoardsBySearch] };
          }
          return {
            fetchBoardsBySearch: [
              ...prev.fetchBoardsBySearch,
              ...options.fetchMoreResult.fetchBoardsBySearch,
            ],
          };
        },
      });
    } catch (error) {
      if (error instanceof Error) console.log(error);
    }
  };

  return (
    <MainListUI
      onClickToMap={onClickToMap}
      onClickListItem={onClickListItem}
      handleChangeGenre={handleChangeGenre}
      handleChangeLocation={handleChangeLocation}
      locationOptions={locationOptions}
      genreOptions={genreOptions}
      data={boardsData}
      onClickMoveToArtRegister={onClickMoveToArtRegister}
      loadMore={loadMore}
    />
  );
};

export default MainList;
