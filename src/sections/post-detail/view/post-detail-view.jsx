import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { GenAddress, GenCurrecy, GetUtility } from '../utils';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import postApi from 'src/api/postApi';

// ----------------------------------------------------------------------

export default function PostDetailPage() {
  const params = useParams();

  const [post, setPost] = useState();
  const [listUtilities, setListUtilities] = useState();

  useLayoutEffect(() => {
    (async () => {
      const res = await postApi.getPostById(params.id);
      const resUti = await postApi.getUtilities();

      setPost(res?.data);
      setListUtilities(resUti?.data);
    })();
  }, [params]);

  const handleVerify = async () => {
    const res = await postApi.verifyPost(params.id);
    if (res.status == 'success') {
      window.location.reload();
    }
  };

  const handleActive = async () => {
    const res = await postApi.activePost(params.id);
    if (res.status == 'success') {
      window.location.reload();
    }
  };

  const handleDisable = async () => {
    const res = await postApi.disablePost(params.id);
    if (res.status == 'success') {
      window.location.reload();
    }
  };

  return (
    <Container>
      <div className="grid grid-cols-4">
        <div className="col-span-1 text-center my-auto bold">
          Status:{' '}
          {post?.status == 'A'
            ? 'Active'
            : post?.status == 'V'
            ? 'Verify'
            : post?.status == 'W'
            ? 'Waiting'
            : 'Inactive'}
        </div>
        {post?.status != 'V' && (
          <div className="col-span-1 text-center">
            <Button variant="contained" color="success" onClick={handleVerify}>
              Verify
            </Button>
          </div>
        )}
        {post?.status != 'A' && post?.status != 'V' && (
          <div className="col-span-1 text-center">
            <Button variant="contained" onClick={handleActive}>
              Active
            </Button>
          </div>
        )}
        {post?.status != 'I' && (
          <div className="col-span-1 text-center">
            <Button variant="contained" color="error" onClick={handleDisable}>
              Inactive
            </Button>
          </div>
        )}
      </div>
      <div className="container mx-auto phone:mx-4 phonel:mx-auto sm:mx-auto md:mx-auto">
        <div className="relative grid grid-cols-2 gap-4 mb-4">
          <div
            className={`relative bg-slate-50 rounded-lg phone:col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 pt-8 text-center`}
          >
            {post?.imageUrl && (
              <Carousel autoPlay={true} stopAutoPlayOnHover={true} animation={'slide'}>
                {[
                  ...post?.imageUrl?.map((image, i) => {
                    return <img className="h-96 object-cover mx-auto" src={image} key={i} />;
                  }),
                ]}
              </Carousel>
            )}
          </div>

          <div className="px-6 pt-4 text-black phone:col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1">
            <div className="text-4xl font-bold mb-4">{post?.name}</div>

            <div className="my-5">
              <div className="flex flex-start gap-4">
                <p className="text-xl font-semibold mb-5">Thông tin cơ bản</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Địa chỉ</p>
                <p className="text-sm">
                  {GenAddress(post?.street, post?.ward, post?.district, post?.province)}
                </p>
              </div>
              <div className="mt-2 grid grid-cols-4">
                {post?.capacity && (
                  <div className="mt-2 phone:col-span-2 sm:col-span-1">
                    <p className="text-gray-500 text-sm">Sức chứa</p>
                    <p className="text-sm">{`${post?.capacity} người`}</p>
                  </div>
                )}
                {post?.area && (
                  <div className="mt-2">
                    <p className="text-gray-500 text-sm">Diện tích</p>
                    <p className="text-sm">{`${post?.area} mét vuông`}</p>
                  </div>
                )}
              </div>
              <div className="mt-2 grid grid-cols-4">
                <div className="mt-2 phone:col-span-2 sm:col-span-1">
                  <p className="text-gray-500 text-sm">Giá phòng</p>
                  <p className="text-sm">{GenCurrecy(post?.cost)}</p>
                </div>
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">Tiền cọc</p>
                  <p className="text-sm">{GenCurrecy(post?.deposit)}</p>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-4 phone:gap-5 sm:gap-0">
                {post?.electricityPrice && (
                  <div>
                    <p className="text-gray-500 text-sm">Tiền điện</p>
                    <p className="text-sm">{GenCurrecy(post?.electricityPrice)}</p>
                  </div>
                )}
                {post?.waterPrice && (
                  <div className="">
                    <p className="text-gray-500 text-sm">Tiền nước</p>
                    <p className="text-sm">{GenCurrecy(post?.waterPrice)}</p>
                  </div>
                )}
                {post?.parkingPrice && (
                  <div className="">
                    <p className="text-gray-500 text-sm">Tiền xe</p>
                    <p className="text-sm">{GenCurrecy(post?.parkingPrice)}</p>
                  </div>
                )}

                {post?.servicePrice && (
                  <div>
                    <p className="text-gray-500 text-sm">Tiền dịch vụ</p>
                    <p className="text-sm">{GenCurrecy(post?.servicePrice)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* rating */}
            <div className="py-4 ">
              <div className="flex flex-row">
                <div className="flex-1 mr-6">
                  <table className="w-full border-collapse border-spacing-0">
                    <tbody>
                      <tr>
                        <td className="w-[20px] text-[#70757a] text-sm">5</td>
                        <td className="pl-1">
                          <div className="h-[8px] rounded bg-[#f1f3f4] overflow-hidden">
                            <div
                              style={{
                                paddingLeft:
                                  (post?.rateInfo?.star5 * 100) /
                                    Math.max(
                                      post?.rateInfo?.star1,
                                      post?.rateInfo?.star2,
                                      post?.rateInfo?.star3,
                                      post?.rateInfo?.star4,
                                      post?.rateInfo?.star5
                                    ) +
                                  '%',
                              }}
                              className="bg-[#786fa6] border-[#786fa6] border-4 rounded w-0"
                            ></div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="w-[20px] text-[#70757a] text-sm">4</td>
                        <td className="pl-1">
                          <div className="h-[8px] rounded bg-[#f1f3f4] overflow-hidden">
                            <div
                              style={{
                                paddingLeft:
                                  (post?.rateInfo?.star4 * 100) /
                                    Math.max(
                                      post?.rateInfo?.star1,
                                      post?.rateInfo?.star2,
                                      post?.rateInfo?.star3,
                                      post?.rateInfo?.star4,
                                      post?.rateInfo?.star5
                                    ) +
                                  '%',
                              }}
                              className="bg-[#786fa6] border-[#786fa6] border-4 rounded w-0"
                            ></div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="w-[20px] text-[#70757a] text-sm">3</td>
                        <td className="pl-1">
                          <div className="h-[8px] rounded bg-[#f1f3f4] overflow-hidden">
                            <div
                              style={{
                                paddingLeft:
                                  (post?.rateInfo?.star3 * 100) /
                                    Math.max(
                                      post?.rateInfo?.star1,
                                      post?.rateInfo?.star2,
                                      post?.rateInfo?.star3,
                                      post?.rateInfo?.star4,
                                      post?.rateInfo?.star5
                                    ) +
                                  '%',
                              }}
                              className="bg-[#786fa6] border-[#786fa6] border-4 rounded w-0"
                            ></div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="w-[20px] text-[#70757a] text-sm">2</td>
                        <td className="pl-1">
                          <div className="h-[8px] rounded bg-[#f1f3f4] overflow-hidden">
                            <div
                              style={{
                                paddingLeft:
                                  (post?.rateInfo?.star2 * 100) /
                                    Math.max(
                                      post?.rateInfo?.star1,
                                      post?.rateInfo?.star2,
                                      post?.rateInfo?.star3,
                                      post?.rateInfo?.star4,
                                      post?.rateInfo?.star5
                                    ) +
                                  '%',
                              }}
                              className="bg-[#786fa6] border-[#786fa6] border-4 rounded w-0"
                            ></div>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="w-[20px] text-[#70757a] text-sm">1</td>
                        <td className="pl-1">
                          <div className="h-[8px] rounded bg-[#f1f3f4] overflow-hidden">
                            <div
                              style={{
                                paddingLeft:
                                  (post?.rateInfo?.star1 * 100) /
                                    Math.max(
                                      post?.rateInfo?.star1,
                                      post?.rateInfo?.star2,
                                      post?.rateInfo?.star3,
                                      post?.rateInfo?.star4,
                                      post?.rateInfo?.star5
                                    ) +
                                  '%',
                              }}
                              className="bg-[#786fa6] border-[#786fa6] border-4 rounded w-0"
                            ></div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-0 text-center align-top">
                  <div className="text-6xl bold">{post?.rateInfo?.avgRate}</div>
                  <div className="text-[#70757a] text-xs">
                    {post?.rateInfo?.total + (post?.rateInfo?.total > 1 ? ' reviews' : ' review')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-auto w-full grid grid-cols-3 gap-4 border-t border-solid border-[#70757a]">
          <div className="col-span-2 phone:col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 ">
            <div className="py-5">
              {post?.description && (
                <div className="my-5">
                  <p className="text-xl font-semibold">Mô tả</p>
                  <p className="text-sm mt-4 whitespace-pre-wrap break-all">{post?.description}</p>
                </div>
              )}
            </div>
            <div className="py-5">
              <p className="text-xl font-semibold">Các tiện ích khác</p>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {post?.utilities?.map((utility) => {
                  let u = GetUtility(utility, listUtilities);
                  return (
                    u && (
                      <div className="">
                        <span className="text-sm ml-2 font-semibold">{u.name}</span>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
          {/* Author card */}
          <div className=" w-full border border-solid  border-[#70757a] content-center py-2 flex items-center justify-center phone:col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1 ">
            <div className="">
              <div className="w-full mb-4 text-center">
                <img
                  height={64}
                  width={64}
                  className="rounded-full mx-auto"
                  src={post?.authorAvatar}
                />
              </div>
              <p className="text-sm text-center mb-2  ">{'Đăng bởi ' + post?.authorName}</p>

              <div className=" text-center mb-2">
                <button
                  type="button"
                  className="button button__fill button__fill-large text__normal"
                >
                  {post?.phone}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
