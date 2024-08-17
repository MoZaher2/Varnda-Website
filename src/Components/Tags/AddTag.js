import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import { useState } from "react";
import { Form, Row, Col ,Button} from 'react-bootstrap';

export default function AddTag({TagsInBasket,setTagsInBasket}) {
  const [tag, setTag] = useState("");

  const handleAddTag = () => {
    if (tag.trim() !== "") {
      setTagsInBasket((prev) => [tag, ...prev]);
      setTag("");
    }
  };

  const handleRemoveTag = (item) => {
    setTagsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  const renderItem = ({ item }) => (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          title="Delete"
          onClick={() => handleRemoveTag(item)}
        >
          <DeleteIcon color="error" />
        </IconButton >
      }
    >
      <ListItemText primary={item} />
    </ListItem>
  );

  return (
    <div>
      <Row className="mt-3">
        <Form.Group as={Col} xs={6} controlId="formGridTitle">
          <Form.Control
            type="text"
            placeholder="ادخل تاج"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </Form.Group>

        <Button as={Col} xs={2} variant="primary" onClick={handleAddTag}>
          اضافه التاج
        </Button>
      </Row>

      <List sx={{ mt: 1 }}>
        <TransitionGroup style={{display: 'flex',flexWrap: 'wrap'}}>
          {TagsInBasket.map((item) => (
            <Collapse key={item}>{renderItem({ item })}</Collapse>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
}
