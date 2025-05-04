// New file for react-beautiful-dnd implementation
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardBody, CardHeader, Button, Badge } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

// Define task and column types
interface Task {
  id: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
}

interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

interface BoardData {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
}

// Initial board data
const initialData: BoardData = {
  tasks: {
    'task-1': { 
      id: 'task-1', 
      content: 'Create marketing campaign for summer sale', 
      priority: 'high',
      assignee: 'Alex',
      dueDate: '2023-07-15'
    },
    'task-2': { 
      id: 'task-2', 
      content: 'Design new product landing page', 
      priority: 'medium',
      assignee: 'Sarah',
      dueDate: '2023-07-20'
    },
    'task-3': { 
      id: 'task-3', 
      content: 'Review Q2 performance metrics', 
      priority: 'low',
      assignee: 'John',
      dueDate: '2023-07-10'
    },
    'task-4': { 
      id: 'task-4', 
      content: 'Update social media strategy', 
      priority: 'medium',
      assignee: 'Emma',
      dueDate: '2023-07-25'
    },
    'task-5': { 
      id: 'task-5', 
      content: 'Prepare monthly financial report', 
      priority: 'high',
      assignee: 'Michael',
      dueDate: '2023-07-05'
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: ['task-4'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: ['task-5'],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export const TaskBoard = () => {
  const [boardData, setBoardData] = React.useState<BoardData>(initialData);
  
  // Handle drag end
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    
    // If there's no destination or the item is dropped in the same place
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return;
    }
    
    // If dragging columns
    if (type === 'column') {
      const newColumnOrder = Array.from(boardData.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      
      setBoardData({
        ...boardData,
        columnOrder: newColumnOrder,
      });
      
      toast.success('Column moved successfully');
      return;
    }
    
    // If dragging tasks
    const startColumn = boardData.columns[source.droppableId];
    const finishColumn = boardData.columns[destination.droppableId];
    
    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      
      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };
      
      setBoardData({
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      });
      
      return;
    }
    
    // Moving from one column to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };
    
    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };
    
    setBoardData({
      ...boardData,
      columns: {
        ...boardData.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });
    
    toast.success(`Task moved to ${finishColumn.title}`, {
      description: `"${boardData.tasks[draggableId].content.substring(0, 30)}..." has been moved.`,
    });
  };
  
  // Get priority badge color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };
  
  return (
    <Card className="border-none shadow-card">
      <CardHeader className="px-6 pt-6 pb-0">
        <div>
          <h3 className="text-xl font-semibold">Task Board</h3>
          <p className="text-sm text-default-500">Manage your team's tasks</p>
        </div>
        <Button 
          color="primary" 
          size="sm"
          startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
        >
          Add Task
        </Button>
      </CardHeader>
      
      <CardBody className="px-6 pb-6 pt-4 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <div 
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex gap-4 min-w-max"
              >
                {boardData.columnOrder.map((columnId, index) => {
                  const column = boardData.columns[columnId];
                  const tasks = column.taskIds.map(taskId => boardData.tasks[taskId]);
                  
                  return (
                    <Draggable key={column.id} draggableId={column.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="w-72"
                        >
                          <div className="bg-content2 rounded-xl overflow-hidden">
                            <div 
                              className="p-3 bg-content3 flex justify-between items-center"
                              {...provided.dragHandleProps}
                            >
                              <h4 className="font-medium flex items-center">
                                <span>{column.title}</span>
                                <Badge content={column.taskIds.length} color="primary" size="sm" className="ml-2" />
                              </h4>
                              <Button 
                                isIconOnly 
                                size="sm" 
                                variant="light" 
                                radius="full"
                              >
                                <Icon icon="lucide:more-horizontal" className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <Droppable droppableId={column.id} type="task">
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className={`p-2 min-h-[200px] ${snapshot.isDraggingOver ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                                >
                                  {tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                      {(provided, snapshot) => (
                                        <motion.div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className={`p-3 mb-2 rounded-lg bg-content1 shadow-sm ${
                                            snapshot.isDragging ? 'shadow-md' : ''
                                          }`}
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ duration: 0.2, delay: index * 0.05 }}
                                        >
                                          <div className="text-sm mb-2">{task.content}</div>
                                          <div className="flex justify-between items-center">
                                            <Badge 
                                              color={getPriorityColor(task.priority) as any} 
                                              variant="flat"
                                              size="sm"
                                            >
                                              {task.priority}
                                            </Badge>
                                            
                                            <div className="flex items-center gap-2">
                                              {task.dueDate && (
                                                <div className="text-xs text-default-500 flex items-center gap-1">
                                                  <Icon icon="lucide:calendar" className="w-3 h-3" />
                                                  {task.dueDate}
                                                </div>
                                              )}
                                              
                                              {task.assignee && (
                                                <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-xs font-medium text-primary">
                                                  {task.assignee.charAt(0)}
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </motion.div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                            
                            <div className="p-2 border-t border-default-100">
                              <Button 
                                size="sm" 
                                variant="light" 
                                className="w-full justify-start"
                                startContent={<Icon icon="lucide:plus" className="w-3.5 h-3.5" />}
                              >
                                Add task
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardBody>
    </Card>
  );
};