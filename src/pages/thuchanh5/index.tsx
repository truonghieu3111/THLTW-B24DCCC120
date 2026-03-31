import { Tabs } from 'antd';
import { useState } from 'react';

import ClubForm from './controllers/clubForm';
import ClubList from './controllers/clubList';

import ApplicationForm from './controllers/applicationForm';
import ApplicationList from './controllers/applicationList';
import HistoryList from './controllers/historyList';

import MemberList from './controllers/memberList';
import Report from './controllers/report';

import { clubs, applications, histories } from './data/storage';
import { changeClub } from './logic/logic';

const { TabPane } = Tabs;

export default function Thuchanh5() {

  const [clubList, setClubList] = useState(clubs);
  const [apps, setApps] = useState(applications);
  const [his, setHis] = useState(histories);

  // ================= CLB =================

  const handleAddClub = (club: any) => {
    const newClub = {
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
      ...club
    };

    const newList = [newClub, ...clubList];
    setClubList(newList);
    localStorage.setItem("clubs", JSON.stringify(newList));
  };

  const handleDeleteClub = (id: number) => {
    const newList = clubList.filter((c: any) => c.id !== id);
    setClubList(newList);
    localStorage.setItem("clubs", JSON.stringify(newList));
  };

  const handleViewMember = (clubId: number) => {
    alert("Xem thành viên CLB ID: " + clubId);
  };

  // ================= ĐƠN =================

  const handleAddApp = (app: any) => {
    const newApp = {
      id: Date.now(),
      status: "Pending",
      note: "",
      ...app
    };

    const newList = [newApp, ...apps];
    setApps(newList);
    localStorage.setItem("apps", JSON.stringify(newList));
  };

  const handleApprove = (id: number) => {
    const newList = apps.map((a: any) =>
      a.id === id ? { ...a, status: "Approved" } : a
    );

    const newHis = [
      {
        id: Date.now(),
        appId: id,
        action: "Approved",
        note: "",
        time: new Date().toLocaleString()
      },
      ...his
    ];

    setApps(newList);
    setHis(newHis);

    localStorage.setItem("apps", JSON.stringify(newList));
    localStorage.setItem("histories", JSON.stringify(newHis));
  };

  const handleReject = (id: number) => {
    const reason = prompt("Nhập lý do từ chối:");
    if (!reason) return;

    const newList = apps.map((a: any) =>
      a.id === id ? { ...a, status: "Rejected", note: reason } : a
    );

    const newHis = [
      {
        id: Date.now(),
        appId: id,
        action: "Rejected",
        note: reason,
        time: new Date().toLocaleString()
      },
      ...his
    ];

    setApps(newList);
    setHis(newHis);

    localStorage.setItem("apps", JSON.stringify(newList));
    localStorage.setItem("histories", JSON.stringify(newHis));
  };

  // ================= MEMBER =================

  const handleChangeClub = (ids: any[], clubId?: number) => {
    if (!clubId) {
      alert("Chọn CLB trước!");
      return;
    }

    const newList = changeClub(apps, ids, clubId);

    setApps(newList);
    localStorage.setItem("apps", JSON.stringify(newList));
  };

  // ================= UI =================

  return (
    <Tabs defaultActiveKey="1">

      {/* CLB */}
      <TabPane tab="Quản lý CLB" key="1">

        <ClubForm onAdd={handleAddClub} />

        <ClubList
          data={clubList}
          onDelete={handleDeleteClub}
          onViewMember={handleViewMember}
        />

      </TabPane>

      {/* ĐƠN */}
      <TabPane tab="Đơn đăng ký" key="2">

        <ApplicationForm clubs={clubList} onAdd={handleAddApp} />

        <ApplicationList
          data={apps}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        <h3>Lịch sử</h3>

        <HistoryList data={his || []} />

      </TabPane>

      {/* MEMBER */}
      <TabPane tab="Thành viên" key="3">

        <MemberList
          data={apps}
          clubs={clubList}
          onChangeClub={handleChangeClub}
        />

      </TabPane>

      {/* REPORT */}
      <TabPane tab="Báo cáo" key="4">

        <Report
          apps={apps}
          clubs={clubList}
        />

      </TabPane>

    </Tabs>
  );
}