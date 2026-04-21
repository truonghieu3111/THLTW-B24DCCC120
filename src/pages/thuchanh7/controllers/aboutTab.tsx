import { Avatar, Card, Space, Tag, Typography } from 'antd';

import type { AuthorProfile } from '../data/types';

interface AboutTabProps {
  profile: AuthorProfile;
}

export default function AboutTab({ profile }: AboutTabProps) {
  return (
    <Card>
      <Space direction="vertical" size={12}>
        <Avatar size={96} src={profile.avatar} />
        <Typography.Title level={4} style={{ margin: 0 }}>
          {profile.name}
        </Typography.Title>
        <Typography.Paragraph>{profile.bio}</Typography.Paragraph>

        <div>
          <Typography.Text strong>Ky nang: </Typography.Text>
          {profile.skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>

        <div>
          <Typography.Text strong>Mang xa hoi: </Typography.Text>
          {profile.socials.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noreferrer" style={{ marginRight: 12 }}>
              {social.label}
            </a>
          ))}
        </div>
      </Space>
    </Card>
  );
}
